package com.backend.domain.itinerary;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalTime;

@Data
public class ItineraryDetail {
    private Integer id;
    private Integer itineraryId;
    private Integer contentId;
    private Integer index;
    private String title;
    private String description;
    private Integer visitDay;
    private LocalTime visitTime;
    private BigDecimal mapy;
    private BigDecimal mapx;
}
