package com.backend.domain.member;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class Member {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String nickName;
    private String oldPassword;
    private String gender;
    private LocalDate birth;
    private String phone;
    private LocalDateTime inserted;

    public String getSignupDateAndTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분 ss초");
        return inserted.format(formatter);
    }
}
