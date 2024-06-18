package com.backend.domain.member;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
public class Member {
    private Long id;
    private String name;
    private String email;
    private String password;
    @Setter
    @Getter
    private String nick_name;
    private String gender;
    private LocalDate birth;
    private String phone;
    private String inserted;
}
