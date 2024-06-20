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
    private String nickName;
    private String gender;
    private LocalDate birth;
    private String phone;
    private LocalDateTime inserted;
}
