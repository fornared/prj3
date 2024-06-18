package com.backend.domain.tour;

import lombok.Data;

@Data
public class Image {
    private Integer id;
    private Integer contentId;
    private String originalUrl;
    private String smallUrl;
}
