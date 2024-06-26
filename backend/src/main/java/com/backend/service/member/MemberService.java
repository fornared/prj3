package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper mapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

    public void add(Member member) {
        if ("male".equalsIgnoreCase(member.getGender())) {
            member.setGender("0");
        } else if ("female".equalsIgnoreCase(member.getGender())) {
            member.setGender("1");
        }
        member.setPassword(passwordEncoder.encode(member.getPassword())); // 비밀번호 암호화
        mapper.insertMember(member);
    }

    public Member getByEmail(String email) {
        return mapper.selectByEmail(email);
    }

    public Member getByNickName(String nickName) {
        return mapper.selectByNickName(nickName);
    }

    public List<Member> list() {
        return mapper.selectAll();
    }

    public Member getById(Integer id) {
        return mapper.selectById(id);
    }

    public void remove(Integer id) {
        mapper.deleteById(id);
    }

    public boolean hasAccess(Member member, Authentication authentication) {
        if (!member.getId().toString().equals(authentication.getName())) {
            return false;
        }

        Member dbMember = mapper.selectById(member.getId());

        if (dbMember != null) {
            return false;
        }

        return passwordEncoder.matches(member.getPassword(), dbMember.getPassword());
    }

    public boolean hasAccessModify(Member member, Authentication authentication) {
        if (!authentication.getName().equals(member.getId().toString())) {
            return false;
        }
        Member dbMember = mapper.selectById(member.getId());
        if (dbMember == null) {
            return false;
        }
        if (!passwordEncoder.matches(member.getOldPassword(), dbMember.getPassword())) {
            return false;
        }
        return true;
    }

    public Map<String, Object> modify(Member member, Authentication authentication) {
        if (member.getPassword() != null && member.getPassword().length() > 0) {
            // 패스워드가 입력되었으니 바꾸기
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        } else {
            // 입력 안됐으니 기존 값으로 유지
            Member dbMember = mapper.selectById((member.getId()));
            member.setPassword(dbMember.getPassword());
        }
        mapper.update(member);

        String token = "";

        Jwt jwt = (Jwt) authentication.getPrincipal();
        Map<String, Object> claims = jwt.getClaims();
        JwtClaimsSet.Builder jwtClaimsSetBuilder = JwtClaimsSet.builder();
        claims.forEach(jwtClaimsSetBuilder::claim);
        jwtClaimsSetBuilder.claim("nickName", member.getNickName());

        JwtClaimsSet jwtClaimsSet = jwtClaimsSetBuilder.build();
        token = jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue();
        return Map.of("token", token); //??
    }

    public Map<String, Object> getToken(Member member) {

        Map<String, Object> result = null;

        Member db = mapper.selectByEmail(member.getEmail());

        if (db != null) {
            if (passwordEncoder.matches(member.getPassword(), db.getPassword())) {
                result = new HashMap<>();
                String token = "";
                Instant now = Instant.now();

                List<String> authority = mapper.selectAuthorityByMemberId(db.getId());
                String authorityString = authority.stream()
                        .collect(Collectors.joining(" "));
                //
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(now)
                        .expiresAt(now.plusSeconds(60 * 60 * 24 * 7))
                        //로그인 시 토큰의 subject를 id로
                        .subject(db.getId().toString())
                        .claim("scope", authorityString)//권한
                        .claim("nickname", db.getNickName())
                        .build();

                token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

                result.put("token", token);
            }
        }

        return result;
    }

    public boolean hasAccess(Integer id, Authentication authentication) {
        boolean self = authentication.getName().equals(id.toString());

        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("SCOPE_admin"));

        return self || isAdmin;
    }
}

//10
