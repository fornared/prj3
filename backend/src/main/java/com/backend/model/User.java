package com.backend.model;

import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDate;

@Data
@Table(name = "member")
public class User {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String nickname;
    private String gender;
    private LocalDate birth;
    private String phone;

    public Object getPassword() {
        return password;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birth = birth;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phone = phone;
    }

    // 생성자, 게터, 세터 등은 생략
}


