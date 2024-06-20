package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.service.member.MemberService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Member member) {
        // 이메일 중복 확인
        if (memberService.getByEmail(member.getEmail()) != null) {
            return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
        }

        // 닉네임 중복 확인
        if (memberService.getByNickName(member.getNickName()) != null) {
            return ResponseEntity.badRequest().body("이미 사용 중인 닉네임입니다.");
        }

        // 회원 가입 처리
        memberService.add(member);
        return ResponseEntity.ok("회원 가입이 완료되었습니다.");
    }

    @GetMapping("/check-email")
    public ResponseEntity<Void> checkEmail(@RequestParam String email) {
        // 이메일 중복 확인
        if (memberService.getByEmail(email) != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/check-nickName")
    public ResponseEntity<Void> checkNickName(@RequestParam String nickName) {
        // 닉네임 중복 확인
        if (memberService.getByNickName(nickName) != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Member member, HttpSession session) {
        boolean isAuthenticated = memberService.login(member.getEmail(), member.getPassword(), session);
        if (isAuthenticated) {
            return ResponseEntity.ok("로그인 성공");
        } else {
            return ResponseEntity.badRequest().body("이메일이나 비밀번호가 일치하지 않습니다.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        memberService.logout(session);
        return ResponseEntity.ok("로그아웃 성공");
    }

    @GetMapping("/status")
    public ResponseEntity<String> status(HttpSession session) {
        boolean isAuthenticated = memberService.isAuthenticated(session);
        if (isAuthenticated) {
            return ResponseEntity.ok("Authenticated");
        } else {
            return ResponseEntity.status(401).body("Not authenticated");
        }
    }
}
