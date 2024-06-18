package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Member member) {
        if (memberService.getByEmail(member.getEmail()) != null) {
            return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
        }

        if (memberService.getByNickName(member.getNick_name()) != null) {
            return ResponseEntity.badRequest().body("이미 사용 중인 닉네임입니다.");
        }

        memberService.add(member);
        return ResponseEntity.ok("회원 가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Member member) {
        Member foundMember = memberService.getByEmail(member.getEmail());
        if (foundMember == null || !foundMember.getPassword().equals(member.getPassword())) {
            return ResponseEntity.badRequest().body("이메일이나 비밀번호가 일치하지 않습니다.");
        }

        return ResponseEntity.ok("로그인 성공!");
    }

    @PostMapping("/token")
    public ResponseEntity<String> getToken(@RequestBody String requestPayload) {
        // 토큰 생성 로직을 구현하거나 응답을 반환합니다.
        return ResponseEntity.ok("토큰 생성 성공");
    }
}
