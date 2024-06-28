package com.backend.mapper.itinerary;

import com.backend.domain.itinerary.Itinerary;
import com.backend.domain.itinerary.ItineraryDetail;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface ItineraryMapper {
    @Insert("""
            INSERT INTO itinerary (member_id, name, start_date, end_date)
            VALUES (#{memberId}, #{name}, #{startDate}, #{endDate})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int InsertItinerary(Itinerary itinerary);

    @Insert("""
            INSERT INTO itinerary_detail (itinerary_id, content_id, description, visit_day, visit_time)
            VALUES (#{itineraryId}, #{contentId}, #{description}, #{visitDay}, #{visitTime})
            """)
    int InsertItineraryDetail(ItineraryDetail visit);
}
