package com.backend.mapper.tour;

import com.backend.domain.tour.Review;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReviewMapper {
    @Select("""
            SELECT r.id, r.review, r.rating, r.inserted, m.nick_name
            FROM review r JOIN member m ON r.member_id = m.id
            WHERE r.content_id=#{contentId}
            ORDER BY id DESC
            """)
    List<Review> selectAllReviewByContentId(Integer contentId);
}
