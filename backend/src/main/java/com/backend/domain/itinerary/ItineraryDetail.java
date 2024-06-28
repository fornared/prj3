package com.backend.domain.itinerary;

import lombok.Data;

import java.time.LocalTime;

@Data
public class ItineraryDetail {
    private Integer id;
    private Integer itineraryId;
    private Integer contentId;
    private String description;
    private Integer visitDay;
    private LocalTime visitTime;
    private Integer index;
}
