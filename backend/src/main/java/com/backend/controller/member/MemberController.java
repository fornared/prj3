package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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
        if (memberService.getByNickName(member.getNickname()) != null) {
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
    public ResponseEntity<String> getToken(@RequestBody Map<String, String> requestPayload) {
        String email = requestPayload.get("email");
        String password = requestPayload.get("password");

        if (email != null && password != null) {
            // 토큰 발급 처리
            String token = memberService.login(email, password);
            if (token != null) {
                return ResponseEntity.ok(token);
            } else {
                return ResponseEntity.status(401).body("이메일이나 비밀번호가 맞지 않습니다.");
            }
        } else {
            return ResponseEntity.badRequest().body("이메일과 비밀번호를 제공해야 합니다.");
        }
    }
}
