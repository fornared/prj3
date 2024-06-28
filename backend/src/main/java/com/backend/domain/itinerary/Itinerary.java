package com.backend.domain.itinerary;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class Itinerary {
    private Integer id;
    private Integer memberId;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime inserted;
}
