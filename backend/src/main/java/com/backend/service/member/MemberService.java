package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final BCryptPasswordEncoder passwordEncoder;

    public void add(Member member) {
        if ("male".equalsIgnoreCase(member.getGender())) {
            member.setGender("0");
        } else if ("female".equalsIgnoreCase(member.getGender())) {
            member.setGender("1");
        }
        member.setPassword(passwordEncoder.encode(member.getPassword())); // 비밀번호 암호화
        memberMapper.insertMember(member);
    }

    public Member getByEmail(String email) {
        return memberMapper.findMemberByEmail(email);
    }

    public Member getByNickName(String nickName) {
        return memberMapper.findMemberByNickName(nickName);
    }

    public List<Member> list() {
        return memberMapper.selectAll();
    }

    public Member getById(Long id) {
        return memberMapper.selectById(id);
    }

    public void remove(Integer id) {
        memberMapper.deleteById(id);
    }

    public boolean hasAccess(Member member) {
        Member dbMember = memberMapper.selectById(member.getId());

        if (dbMember != null) {
            return false;
        }

        boolean matches = passwordEncoder.matches(member.getPassword(), dbMember.getPassword());
        System.out.println("matches: " + matches);
        return matches;

    }

    public void remove(Long id) {
    }

    public boolean hasAccessModify(Member member, Authentication authentication) {
        if (!authentication.getName().equals(member.getId().toString())) {
            return false;
        }

        Member dbMember = memberMapper.selectById(member.getId());
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
            Member dbMember = memberMapper.selectById(member.getId());
            member.setPassword(dbMember.getPassword());
        }
        memberMapper.update(member);
        return Map.of(); //??
    }
}
