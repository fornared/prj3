package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.service.member.MemberService;
import com.backend.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

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
    public ResponseEntity<String> login(@RequestBody Member member) {
        // 로그인 처리
        Member foundMember = memberService.getByEmail(member.getEmail());
        if (foundMember == null || !foundMember.getPassword().equals(member.getPassword())) {
            return ResponseEntity.badRequest().body("이메일이나 비밀번호가 일치하지 않습니다.");
        }

        return ResponseEntity.ok("로그인 성공!");
    }

    @PostMapping("/token")
    public ResponseEntity<?> generateToken(@RequestBody Member member) {
        // 로그인 검증 로직
        Member foundMember = memberService.getByEmail(member.getEmail());
        if (foundMember == null || !foundMember.getPassword().equals(member.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        // 토큰 생성
        String token = jwtTokenUtil.generateToken(String.valueOf(foundMember));

        // 토큰 반환
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }
}
