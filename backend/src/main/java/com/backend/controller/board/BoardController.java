package com.backend.controller.board;

import com.backend.domain.board.Board;
import com.backend.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService service;

    @PostMapping("add")
    public void add(@RequestBody Board board) {
        service.add(board);
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
