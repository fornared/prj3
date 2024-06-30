package com.backend.mapper.itinerary;

import com.backend.domain.itinerary.Itinerary;
import com.backend.domain.itinerary.ItineraryDetail;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ItineraryMapper {
    @Insert("""
            INSERT INTO itinerary (member_id, name, start_date, end_date)
            VALUES (#{memberId}, #{name}, #{startDate}, #{endDate})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertItinerary(Itinerary itinerary);

    @Insert("""
            INSERT INTO itinerary_detail (itinerary_id, content_id, description, visit_day, visit_time)
            VALUES (#{itineraryId}, #{contentId}, #{description}, #{visitDay}, #{visitTime})
            """)
    int insertItineraryDetail(ItineraryDetail visit);

    @Select("""
            SELECT *
            FROM itinerary
            WHERE member_id=#{memberId}
            ORDER BY inserted DESC
            """)
    List<Itinerary> selectAll(Integer memberId);

    @Select("""
            SELECT *, DATEDIFF(end_date, start_date) + 1 AS days
            FROM itinerary
            WHERE id=#{id}
            """)
    Itinerary selectById(Integer id);

    @Select("""
            SELECT id.*,
                   c.title,
                   (ROW_NUMBER() over (ORDER BY id.id) - 1) AS 'index',
                   TIME_FORMAT(id.visit_time, '%H:%i') AS 'visit_time',
                   i.mapy,
                   i.mapx
            FROM itinerary_detail id
                JOIN content c ON id.content_id = c.id 
                JOIN info1 i ON c.id = i.content_id
            WHERE itinerary_id=#{id}
            """)
    List<ItineraryDetail> selectDetailById(Integer id);

    @Update("""
            UPDATE itinerary_detail
            SET description=#{description}, visit_time=#{visitTime}
            WHERE id=#{id}
            """)
    int updateItineraryDetail(ItineraryDetail visit);

    @Delete("""
            DELETE FROM itinerary_detail
            WHERE itinerary_id=#{id}
            """)
    int deleteDetailByItineraryId(Integer id);

    @Delete("""
            DELETE FROM itinerary
            WHERE id=#{id}
            """)
    int deleteById(Integer id);
}
