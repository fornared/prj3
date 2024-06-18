package com.backend.controller;

import com.backend.model.User;
import com.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class SignupController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequest signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 사용중인 이메일입니다.");
        }
        if (userRepository.findByNickname(signUpRequest.getNickname()).isPresent()) {
            return ResponseEntity.badRequest().body("이미 사용중인 닉네임입니다.");
        }

        User user = new User();
        user.setId(Long.valueOf(signUpRequest.getId()));
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setName(signUpRequest.getName());
        user.setNickname(signUpRequest.getNickname());
        user.setGender(signUpRequest.getGender());
        user.setBirthDate(signUpRequest.getBirth());
        user.setPhoneNumber(signUpRequest.getPhone());

        userRepository.save(user);

        return ResponseEntity.ok("사용자가 성공적으로 등록되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if (userOptional.isEmpty() || !userOptional.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.badRequest().body("이메일이나 비밀번호가 맞지 않습니다.");
        }

        // 로그인 성공
        return ResponseEntity.ok("로그인 성공!");
    }
}

