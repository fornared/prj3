package com.backend.controller;

import lombok.Data;

import java.time.LocalDate;

@Data
public class SignUpRequest {
    private String id;
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String gender;
    private LocalDate birth;
    private String phone;

}
