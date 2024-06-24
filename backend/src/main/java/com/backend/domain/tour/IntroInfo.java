package com.backend.domain.tour;

import lombok.Data;

@Data
public class IntroInfo {
    private Integer id;
    private Integer contentId;
    private Integer typeId;
    private String accomCount;
    private String chkBabyCarriage;
    private String chkCreditCard;
    private String chkPet;
    private String expAgeRange;
    private String expGuide;
    private String parking;
    private String openDate;
    private String restDate;
    private String telCenter;
    private String useSeason;
    private String useTime;
    // 12
    private Integer heritage1;
    private Integer heritage2;
    private Integer heritage3;
    private Integer heritage;
    // 14
    private String discount;
    private String parkingFee;
    private String useFee;
    private String scale;
    private String spendTime;
    // 15
    private String ageLimit;
    private String bookingPlace;
    private String startDate;
    private String endDate;
    private String place;
    private String placeInfo;
    private String playTime;
    private String program;
    private String sponsor1;
    private String telSponsor1;
    private String sponsor2;
    private String telSponsor2;
    private String subEvent;
    // 25
    //
    // 28
    private String openPeriod;
    private String reservation;
    // 32
    private String checkIn;
    private String checkOut;
    private String chkCooking;
    private String foodPlace;
    private String pickup;
    private String reservationTel;
    private String reservationUrl;
    private String roomCount;
    private String roomType;
    private String subFacility;
    // 38
    private String fairDay;
    private String openTime;
    private String restRoom;
    private String saleItem;
    private String shopGuide;
    // 39
    private String firstMenu;
    private String menu;
    private String kidsFacility;
    private String packing;
    private String seat;
}
