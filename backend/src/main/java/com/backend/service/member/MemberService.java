package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public void remove(Long id) {
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
        return Map.of(); //??
    }

    public Map<String, Object> getToken(Member member) {

        Map<String, Object> result = null;

        Member db = mapper.selectByEmail(member.getEmail());

        if (db != null) {
            if (passwordEncoder.matches(member.getPassword(), db.getPassword())) {
                result = new HashMap<>();
                String token = "";
                Instant now = Instant.now();
                //
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(now)
                        .expiresAt(now.plusSeconds(60 * 60 * 24 * 7))
                        .subject(member.getEmail())
                        .claim("scope", "")
                        .claim("nickname", db.getNickName())
                        .build();

                token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

                result.put("token", token);
            }
        }

        return result;
    }

    public boolean hasAccess(Integer id, Authentication authentication) {
        if (!authentication.getName().equals(id.toString())) {
            return false;
        }
        Member db = mapper.selectById(id);
        if (db == null) {
            return false;
        }
        return false;
    }
}

//10
