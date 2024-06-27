package com.backend.controller.tour;

import com.backend.domain.tour.Review;
import com.backend.service.tour.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tour")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService service;

    @PostMapping("add/review")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addReview(@RequestBody Review review, Authentication auth) {
        if ((service.validate(review))) {
            service.add(review, auth);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{contentId}/review")
    public List<Review> getReview(@PathVariable(value = "contentId") Integer contentId) {
        return service.getReviewList(contentId);
    }

    @DeleteMapping("/remove/review")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity removeReview(@RequestBody Review review, Authentication auth) {
        if (service.hasAccess(review, auth)) {
            service.remove(review);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
