package com.backend.controller.tour;

import com.backend.domain.tour.Review;
import com.backend.service.tour.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tour")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService service;

    @PostMapping("add/review")
    public ResponseEntity addReview(@RequestBody Review review) {
        System.out.println(review);

        return null;
    }

    @GetMapping("/{contentId}/review")
    public List<Review> getReview(@PathVariable(value = "contentId") Integer contentId) {
        return service.getReviewList(contentId);
    }
}
