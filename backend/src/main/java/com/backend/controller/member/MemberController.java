package com.backend.controller.member;

import com.backend.domain.member.Member;
import com.backend.mapper.member.MemberMapper;
import com.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService service;
    private final MemberMapper memberMapper;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Member member) {
        // 이메일 중복 확인
        if (service.getByEmail(member.getEmail()) != null) {
            return ResponseEntity.badRequest().body("이미 사용 중인 이메일입니다.");
        }

        // 닉네임 중복 확인
        if (service.getByNickName(member.getNickName()) != null) {
            return ResponseEntity.badRequest().body("이미 사용 중인 닉네임입니다.");
        }

        // 회원 가입 처리
        service.add(member);
        return ResponseEntity.ok("회원 가입이 완료되었습니다.");
    }

    @GetMapping("/check-email")
    public ResponseEntity<Void> checkEmail(@RequestParam String email) {
        // 이메일 중복 확인
        if (service.getByEmail(email) != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/check-nickName")
    public ResponseEntity<Void> checkNickName(@RequestParam String nickName) {
        System.out.println("nickName: " + nickName);
        // 닉네임 중복 확인
        if (service.getByNickName(nickName) != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/list")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public List<Member> list() {
        return service.list();
    }

    @GetMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Member> get(@PathVariable Integer id, Authentication authentication) {

        if (!service.hasAccess(id, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Member member = service.getById(id);
        if (member == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(member);
        }
    }

    @DeleteMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity delete(@RequestBody Member member, Authentication authentication) {
        if (service.hasAccess(member, authentication)) {
            service.remove(member.getId());
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PutMapping("modify")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity modify(@RequestBody Member member,
                                 Authentication authentication) {
        if (service.hasAccessModify(member, authentication)) {
            Map<String, Object> result = service.modify(member, authentication);
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        }
    }

    @PostMapping("token")
    public ResponseEntity token(@RequestBody Member member) {
        Map<String, Object> map = service.getToken(member);
        if (map == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(map);
    }
}



