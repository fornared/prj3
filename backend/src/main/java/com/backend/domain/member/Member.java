package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Member {

    private Long id;
    private String name;
    private String email;
    private String password;
    private String nick_name;
    private String gender;
    private LocalDate birth;
    private String phone;
    private LocalDateTime inserted;

    public Member() {
    }

    public Member(String name, String email, String password, String nick_name, String gender, LocalDate birth, String phone, LocalDateTime inserted) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.nick_name = nick_name;
        this.gender = gender;
        this.birth = birth;
        this.phone = phone;
        this.inserted = inserted;
    }
}
