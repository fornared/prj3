package com.backend.domain.tour;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Review {
    private Integer id;
    private Integer contentId;
    private Integer memberId;
    private Integer rating;
    private String review;
    private LocalDateTime inserted;

    private String nickName;
}
