package com.backend.service.tour;

import com.backend.domain.tour.Review;
import com.backend.mapper.tour.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ReviewService {
    private final ReviewMapper mapper;

    public List<Review> getReviewList(Integer contentId) {
        return mapper.selectAllReviewByContentId(contentId);
    }
}
