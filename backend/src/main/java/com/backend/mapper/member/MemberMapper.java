package com.backend.mapper.member;

import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MemberMapper {

    @Insert("INSERT INTO member (" +
            "name, email, password, nick_name, gender, birth, phone, inserted) " +
            "VALUES (#{name}, #{email}, #{password}, #{nick_name}, #{gender}, #{birth}, #{phone}, #{inserted})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Member member);

    @Select("SELECT * FROM member WHERE email = #{email}")
    Member findMemberByEmail(String email);

    @Select("SELECT * FROM member WHERE nick_name = #{nick_name}")
    Member findMemberByNickName(String nick_name);
}
