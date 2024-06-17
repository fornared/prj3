package com.backend.controller;

import com.backend.domain.Member;
import com.backend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Member member) {
        try {
            memberService.signup(member);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
//
    @GetMapping("/check")
    public ResponseEntity<?> checkExistence(@RequestParam(required = false) String email,
                                            @RequestParam(required = false) String nickName) {
        if (email != null && memberService.getByEmail(email) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        if (nickName != null && memberService.getByNickName(nickName) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Nickname already exists");
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/token")
    public ResponseEntity<?> login(@RequestBody Member member) {
        Member loginMember = memberService.login(member.getEmail(), member.getPassword());
        if (loginMember != null) {
            return ResponseEntity.ok().body("token"); // 실제로는 JWT 등을 생성하여 반환해야 함
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
