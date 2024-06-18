package com.backend.service.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;

    public void add(Member member) {
        memberMapper.insertMember(member);
    }

    public Member getByEmail(String email) {
        return memberMapper.findMemberByEmail(email);
    }

    public Member getByNickName(String nick_name) {
        return memberMapper.findMemberByNickName(nick_name);
    }
}
