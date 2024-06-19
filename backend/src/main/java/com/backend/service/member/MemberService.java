package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import com.backend.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final JwtTokenUtil jwtTokenUtil;

    public void add(Member member) {
        memberMapper.insertMember(member);
    }

    public Member getByEmail(String email) {
        return memberMapper.findMemberByEmail(email);
    }

    public Member getByNickName(String nickName) {
        return memberMapper.findMemberByNickName(nickName);
    }

    public String login(String email, String password) {
        Member member = memberMapper.findMemberByEmail(email);
        if (member != null && member.getPassword().equals(password)) {
            return jwtTokenUtil.generateToken(member.getEmail());
        } else {
            return null;
        }
    }
}
