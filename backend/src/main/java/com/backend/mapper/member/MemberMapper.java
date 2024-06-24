package com.backend.mapper.member;

import com.backend.domain.member.Member;
import org.apache.ibatis.annotations.*;

import java.util.List;

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

    @Select("""
            SELECT id, name, email, password, nick_name, gender, birth, phone, inserted
            FROM member
            ORDER BY id ASC
            """)
    List<Member> selectAll();

    @Select("""
            SELECT id, name, email, password, nick_name, gender, birth, phone, inserted
            FROM member
            WHERE id = #{id}
            """)
    Member selectById(Long id);


    @Delete("""
            DELETE FROM member
            WHERE id = #{id}
            """)
    void deleteById(Integer id);

    @Update("""
            UPDATE member 
            SET
                password = #{password},
                nick_name = #{nickName}
            WHERE id = #{id}
            """)
    int update(Member member);
}
