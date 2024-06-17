package com.backend.mapper.member;

import com.backend.domain.Member;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MemberMapper {

    @Insert("""
            INSERT INTO member (email, password, nick_name)
            VALUES (#{email}, #{password}, #{nickName})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(Member member);
//
    @Select("""
            SELECT * 
            FROM member 
            WHERE email = #{email}
            """)
    Member selectByEmail(String email);

    @Select("""
            SELECT * 
            FROM member 
            WHERE nick_name = #{nickName}
            """)
    Member selectByNickName(String nickName);

    @Select("""
            SELECT * 
            FROM member 
            WHERE email = #{email} AND password = #{password}
            """)
    Member selectByEmailAndPassword(String email, String password);
}
