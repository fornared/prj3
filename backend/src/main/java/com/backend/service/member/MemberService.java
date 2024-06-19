package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    public void addMember(Member member) {
        memberMapper.insert(member);
    }

    public Member getMemberByEmail(String email) {
        return memberMapper.findMemberByEmail(email);
    }

    public Member getMemberByNickName(String nickName) {
        return memberMapper.findMemberByNickName(nickName);
    }

    public String login(String email, String password) {
        Member member = memberMapper.findMemberByEmail(email);
        if (member != null && member.getPassword().equals(password)) {
            // Here you would generate a token, for example using JWT
            return "generated-jwt-token";
        } else {
            return null;
        }
    }
}
