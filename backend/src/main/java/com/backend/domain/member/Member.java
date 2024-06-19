package com.backend.domain.member;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class Member {

    private Long id;
    private String name;
    private String email;
    private String password;
    private String nickname;
    private String gender;
    private LocalDate birth;
    private String phone;
    private LocalDateTime inserted;

    public Member() {
    }

    public Member(String name, String email, String password, String nickname, String gender, LocalDate birth, String phone, LocalDateTime inserted) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.gender = gender;
        this.birth = birth;
        this.phone = phone;
        this.inserted = inserted;
    }

}
