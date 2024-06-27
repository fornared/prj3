package com.backend.service.tour;

import com.backend.domain.tour.Review;
import com.backend.mapper.tour.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ReviewService {
    private final ReviewMapper mapper;

    public boolean validate(Review review) {
        if (review == null) {
            return false;
        }

        if (review.getReview().isBlank()) {
            return false;
        }

        if (review.getContentId() == null) {
            return false;
        }

        if (review.getRating() == null) {
            return false;
        }

        return true;
    }

    public boolean hasAccess(Review review, Authentication auth) {
        Review dbReview = mapper.selectById(review.getId());
        if (dbReview == null) {
            return false;
        }
        if (!auth.getName().equals(dbReview.getMemberId().toString())) {
            return false;
        }
        return true;
    }

    public void add(Review review, Authentication auth) {
        review.setMemberId(Integer.valueOf(auth.getName()));

        mapper.insert(review);
    }

    public List<Review> getReviewList(Integer contentId) {
        return mapper.selectAllReviewByContentId(contentId);
    }

    public void remove(Review review) {
        mapper.deleteById(review.getId());
    }
}
