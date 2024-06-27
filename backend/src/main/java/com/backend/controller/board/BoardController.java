package com.backend.controller.board;

import com.backend.domain.board.Board;
import com.backend.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService service;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity add(
            Authentication authentication,
            Board board,
            @RequestParam(value = "files[]", required = false) MultipartFile[] files) throws IOException {

        if (service.validate(board)) {
            service.add(board, files, authentication);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("list")
    public List<Board> list() {
        return service.list();
    }

    @GetMapping("{id}")
    public Board get(@PathVariable Integer id) {
        return service.get(id);
    }
}
