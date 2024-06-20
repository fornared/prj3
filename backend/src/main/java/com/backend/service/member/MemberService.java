package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

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

    public boolean login(String email, String password, HttpSession session) {
        Member member = memberMapper.findMemberByEmail(email);
        if (member != null && passwordEncoder.matches(password, member.getPassword())) { // 암호화된 비밀번호 비교
            session.setAttribute("member", member);
            return true;
        } else {
            return false;
        }
    }

    public boolean isAuthenticated(HttpSession session) {
        return session.getAttribute("member") != null;
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }
}
