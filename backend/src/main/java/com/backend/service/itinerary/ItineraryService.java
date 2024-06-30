package com.backend.service.itinerary;

import com.backend.domain.itinerary.Itinerary;
import com.backend.domain.itinerary.ItineraryDetail;
import com.backend.mapper.itinerary.ItineraryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class ItineraryService {
    private final ItineraryMapper mapper;
    private Integer itineraryId;

    public Integer add(Itinerary itinerary, Authentication auth) {
        itinerary.setMemberId(Integer.valueOf(auth.getName()));

        mapper.insertItinerary(itinerary);
        itineraryId = itinerary.getId();

        return null;
    }

    public void addDetail(List<ItineraryDetail> visitList) {
        for (ItineraryDetail visit : visitList) {
            if (visit.getItineraryId() == null) {
                visit.setItineraryId(itineraryId);
            }
            mapper.insertItineraryDetail(visit);
        }
    }

    public List<Itinerary> list(Authentication auth) {
        return mapper.selectAll(Integer.valueOf(auth.getName()));
    }

    public Map<String, Object> get(Integer id) {
        Map<String, Object> result = new HashMap<>();

        result.put("itinerary", mapper.selectById(id));
        result.put("detail", mapper.selectDetailById(id));
        System.out.println(mapper.selectDetailById(id));

        return result;
    }

    public void modifyDetail(List<ItineraryDetail> visitList) {
        for (ItineraryDetail visit : visitList) {
            mapper.updateItineraryDetail(visit);
        }
    }

    public void remove(Integer id) {
        mapper.deleteDetailByItineraryId(id);
        mapper.deleteById(id);
    }
}
