package com.backend.mapper.tour;

import com.backend.domain.tour.Area;
import com.backend.domain.tour.Category;
import com.backend.domain.tour.Content;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface TourMapper {
    @Insert("""
            INSERT INTO area (area_code, name)
            VALUES (#{areaCode}, #{name})
            """)
    int insertArea(Area area);

    @Select("""
            SELECT area_code 
            FROM area
            """)
    List<Integer> selectAreaCode();

    @Insert("""
            INSERT INTO sigungu (area_code, sigungu_code, name)
            VALUES (#{areaCode}, #{sigunguCode}, #{name})
            """)
    int insertSigungu(Area area);

    @Select("""
            SELECT *
            FROM sigungu
            """)
    Area selectSigungu();

    @Select("""
            SELECT cat1
            FROM category1
            """)
    List<String> selectCat1();

    @Select("""
            SELECT cat2
            FROM category2
            """)
    List<String> selectCat2();

    @Select("""
            SELECT cat3
            FROM category3
            """)
    List<String> selectCat3();

    @Insert("""
            INSERT INTO category1 (cat1, name)
            VALUES (#{cat1}, #{name})
            """)
    int insertCategory1(Category category);

    @Insert("""
            INSERT INTO category2 (cat1, cat2, name)
            VALUES (#{cat1}, #{cat2}, #{name})
            """)
    int insertCategory2(Category category);

    @Insert("""
            INSERT INTO category3 (cat2, cat3, name)
            VALUES (#{cat2}, #{cat3}, #{name})
            """)
    int insertCategory3(Category category);

    @Select("""
            SELECT ex_content_id
            FROM content
            """)
    List<Integer> selectExContentId();

    @Insert("""
            INSERT INTO content (ex_content_id, type_id, cat3, area_code, sigungu_code, title)
            VALUES (#{contentId}, #{typeId}, #{cat3}, #{areaCode}, #{sigunguCode}, #{title})
            """)
    int insertContent(Content content);

    @Insert("""
            INSERT INTO info1 (content_id, zipcode, address, tel, homepage, overview,
                                first_image1, first_image2, mapx, mapy, created, modified)
            VALUES ((SELECT id FROM content WHERE ex_content_id=#{contentId}), #{zipcode}, #{address}, #{tel}, #{homepage}, #{overview},
                    #{firstImage1}, #{firstImage2}, #{mapx}, #{mapy}, #{created}, #{modified})
            """)
    int insertInfo1(Content content);

    @Select("""
            SELECT COUNT(ex_content_id)
            FROM content
            WHERE ex_content_id=#{contentId}
            """)
    int countExContentIdByContentId(Integer contentId);
}
