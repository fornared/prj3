package com.backend.mapper.tour;

import com.backend.domain.tour.Review;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReviewMapper {
    @Select("""
            SELECT r.id, r.review, r.rating, r.inserted, m.nick_name, r.member_id
            FROM review r JOIN member m ON r.member_id = m.id
            WHERE r.content_id=#{contentId}
            ORDER BY id DESC
            """)
    List<Review> selectAllReviewByContentId(Integer contentId);

    @Insert("""
            INSERT INTO review (content_id, member_id, review, rating)
            VALUES (#{contentId}, #{memberId}, #{review}, #{rating})
            """)
    int insert(Review review);

    @Select("""
            SELECT *
            FROM review
            WHERE id=#{id}
            """)
    Review selectById(Integer id);

    @Delete("""
            DELETE FROM review
            WHERE id=#{id}
            """)
    int deleteById(Integer id);
}
