package com.backend.mapper.member;

import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MemberMapper {

    @Insert("INSERT INTO member (" +
            "id, name, email, password, nick_name, gender, birth, phone, inserted) " +
            "VALUES (#{id}, #{name}, #{email}, #{password}, #{nickName}, #{gender}, #{birth}, #{phone}, #{inserted})")
    void insertMember(Member member);

    @Select("SELECT * FROM member WHERE email = #{email}")
    Member findMemberByEmail(@Param("email") String email);

    @Select("SELECT * FROM member WHERE nick_name = #{nickName}")
    Member findMemberByNickName(@Param("nickName") String nickName);


}
