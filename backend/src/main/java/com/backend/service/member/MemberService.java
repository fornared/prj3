package com.backend.service;

import com.backend.domain.Member;

public interface MemberService {
    void signup(Member member);
    Member getByEmail(String email);
    Member getByNickName(String nickName);
    Member login(String email, String password);
}
