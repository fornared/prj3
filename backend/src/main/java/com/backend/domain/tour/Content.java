package com.backend.domain.tour;

import lombok.Data;

@Data
public class Content {
    //content
    private Integer id;
    private Integer exContentId;
    private Integer typeId;
    private String cat3;
    private Integer areaCode;
    private Integer sigunguCode;
    private String title;
    //info1
    private Integer contentId;
    private Integer zipcode;
    private String address;
    private String tel;
    private String homepage;
    private String overview;
    private String firstImage1;
    private String firstImage2;
    private Double mapx;
    private Double mapy;
    private String created;
    private String modified;
}
