package com.backend.service.itinerary;

import com.backend.domain.itinerary.Itinerary;
import com.backend.domain.itinerary.ItineraryDetail;
import com.backend.mapper.itinerary.ItineraryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ItineraryService {
    private final ItineraryMapper mapper;
    private Integer itineraryId;

    public Integer add(Itinerary itinerary, Authentication auth) {
        itinerary.setMemberId(Integer.valueOf(auth.getName()));

        mapper.InsertItinerary(itinerary);
        itineraryId = itinerary.getId();

        return null;
    }

    public void addDetail(List<ItineraryDetail> visitList) {
        for (ItineraryDetail visit : visitList) {
            visit.setItineraryId(itineraryId);
            mapper.InsertItineraryDetail(visit);
        }
    }
}
