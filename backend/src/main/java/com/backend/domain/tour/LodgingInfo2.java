package com.backend.domain.tour;

import lombok.Data;

@Data
public class LodgingInfo2 {
    // 숙박 카테고리 상세 정보
    Integer id;
    Integer contentId;
    Integer number;
    String title;
    String size;
    String roomCount;
    String baseAccomCount;
    String maxAccomCount;
    String offSeasonFeeWd;
    String peakSeasonFeeWd;
    String offSeasonFeeWe;
    String peakSeasonFeeWe;
    String intro;
    //
    String aircondition;
    String bath;
    String bathFacility;
    String cable;
    String cook;
    String hairdryer;
    String homeTheater;
    String internet;
    String pc;
    String sofa;
    String refrigerator;
    String toiletries;
    String tv;
    // 이미지 링크
    String img1;
    String img2;
    String img3;
    String img4;
    String img5;

    // 이미지 테이블
    Integer lodgingInfo2Id;
    String imgUrl;
}
