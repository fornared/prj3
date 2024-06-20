package com.backend.mapper.tour;

import com.backend.domain.tour.*;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

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
    int countContentByExContentId(Integer contentId);

    @Select("""
            SELECT COUNT(*)
            FROM info1 i JOIN content c ON i.content_id = c.id
            WHERE c.ex_content_id=#{contentId}
            """)
    int countInfo1ByExContentIdOnContent(Integer contentId);

    @Update("""
            UPDATE info1 
            SET homepage=#{homepage}, overview=#{overview}
            WHERE content_id=#{id}
            """)
    int insertInfo1Detail(Content content);

    @Insert("""
            INSERT INTO info2 (content_id, number, info_name, info_text)
            VALUES (#{contentId}, #{number}, #{infoName}, #{infoText})
            """)
    int insertInfo2(Info2 info2);

    @Select("""
            SELECT c.id, c.title, i.first_image1
            FROM content c JOIN info1 i ON c.id = i.content_id
            ORDER BY i.modified DESC
            LIMIT 12
            """)
    List<Content> selectAll();

    @Select("""
            SELECT c.id, c.title, i.zipcode, i.address, i.tel, i.homepage, i.overview, i.first_image1, i.first_image2, i.mapx, i.mapy, i.modified
            FROM content c JOIN info1 i ON c.id = i.content_id
            WHERE c.id=#{id}
            """)
    Content selectContentInfoById(Integer id);

    @Select("""
            SELECT id
            FROM content
            WHERE ex_content_id=#{contentId}
            """)
    Integer selectIdByExContentId(Integer contentId);

    @Insert("""
            INSERT INTO image(content_id, original_url, small_url)
            VALUES (#{contentId}, #{originalUrl}, #{smallUrl})
            """)
    int insertImage(Image image);

    @Select("""
            <script>
            SELECT COUNT(c.id)
            FROM content c
                <if test="typeId != null">
                    JOIN content_type ct ON c.type_id=ct.id
                </if>
                <if test="catCode != null">
                    <choose>
                        <when test = "catCode.length == 3">
                            JOIN category1 cat1 ON LEFT(c.cat3, 3) = cat1.cat1
                        </when>
                        <when test = "catCode.length == 5">
                            JOIN category2 cat2 ON LEFT(c.cat3, 5) = cat2.cat2
                        </when>
                        <otherwise>
                            JOIN category3 cat3 ON c.cat3 = cat3.cat3
                        </otherwise>
                    </choose>
                </if>
                <if test="areaCode != null">
                    JOIN area a ON c.area_code = a.area_code
                </if>
                <if test="sigunguCode != null">
                    JOIN sigungu s ON c.area_code = s.area_code AND c.sigungu_code = s.sigungu_code
                </if>
            <trim prefix="WHERE" prefixOverrides="AND">
                <if test="typeId != null">
                    c.type_id=#{typeId}
                </if>
                <if test="catCode != null">
                    AND
                    <choose>
                        <when test = "catCode.length == 3">
                            LEFT(c.cat3, 3) = #{catCode}
                        </when>
                        <when test = "catCode.length == 5">
                            LEFT(c.cat3, 5) = #{catCode}
                        </when>
                        <otherwise>
                            c.cat3 = #{catCode}
                        </otherwise>
                    </choose>
                </if>
                <if test="areaCode != null">
                    AND c.area_code=#{areaCode}
                </if>
                <if test="sigunguCode != null">
                    AND c.sigungu_code=#{sigunguCode}
                </if>
                <if test="keyword != null">
                    AND c.title LIKE CONCAT('%', #{keyword}, '%')
                </if>
            </trim>
            </script>
            """)
    Integer countAllWithSearch(Integer typeId, String catCode, Integer areaCode, Integer sigunguCode, String keyword);

    @Select("""
            <script>
            SELECT c.id, c.title, i.id, i.first_image1
            FROM content c
                JOIN info1 i ON c.id = i.content_id
                <if test="typeId != null">
                    JOIN content_type ct ON c.type_id=ct.id
                </if>
                <if test="catCode != null">
                    <choose>
                        <when test = "catCode.length == 3">
                            JOIN category1 cat1 ON LEFT(c.cat3, 3) = cat1.cat1
                        </when>
                        <when test = "catCode.length == 5">
                            JOIN category2 cat2 ON LEFT(c.cat3, 5) = cat2.cat2
                        </when>
                        <otherwise>
                            JOIN category3 cat3 ON c.cat3 = cat3.cat3
                        </otherwise>
                    </choose>
                </if>
                <if test="areaCode != null">
                    JOIN area a ON c.area_code = a.area_code
                </if>
                <if test="sigunguCode != null">
                    JOIN sigungu s ON c.area_code = s.area_code AND c.sigungu_code = s.sigungu_code
                </if>
            <trim prefix="WHERE" prefixOverrides="AND">
                <if test="typeId != null">
                    c.type_id=#{typeId}
                </if>
                <if test="catCode != null">
                    AND
                    <choose>
                        <when test = "catCode.length == 3">
                            LEFT(c.cat3, 3) = #{catCode}
                        </when>
                        <when test = "catCode.length == 5">
                            LEFT(c.cat3, 5) = #{catCode}
                        </when>
                        <otherwise>
                            c.cat3 = #{catCode}
                        </otherwise>
                    </choose>
                </if>
                <if test="areaCode != null">
                    AND c.area_code=#{areaCode}
                </if>
                <if test="sigunguCode != null">
                    AND c.sigungu_code=#{sigunguCode}
                </if>
                <if test="keyword != null">
                    AND title LIKE CONCAT('%', #{keyword}, '%')
                </if>
            </trim>
            ORDER BY i.modified DESC
            LIMIT #{offset}, 12
            </script>
            """)
    List<Content> selectAllPaging(Integer offset, Integer typeId, String catCode, Integer areaCode, Integer sigunguCode, String keyword);

    @Select("""
            SELECT id
            FROM content_type
            WHERE name=#{name}
            """)
    Integer selectTypeIdByName(String name);

    @Select("""
            SELECT DISTINCT CASE
                    WHEN c1.name=#{name} THEN c1.cat1
                    WHEN c2.name=#{name} THEN c2.cat2
                    WHEN c3.name=#{name} THEN c3.cat3
                    END AS catCode
            FROM category1 c1
                     JOIN category2 c2 ON c1.cat1 = c2.cat1
                     JOIN category3 c3 ON c2.cat2 = c3.cat2
            WHERE c1.name=#{name}
               OR c2.name=#{name}
               OR c3.name=#{name};
            """)
    String selectCatByName(String name);

    @Select("""
            SELECT area_code
            FROM area
            WHERE name=#{name}
            """)
    Integer selectAreaCodeByName(String name);

    @Select("""
            SELECT sigungu_code
            FROM sigungu
            WHERE area_code=#{areaCode} AND name=#{name}
            """)
    Integer selectSigunguCodeByName(Integer areaCode, String name);

    @Select("""
            SELECT id
            FROM content_type
            """)
    List<Integer> selectTypeId();

    @Insert("""
            INSERT INTO type_category_mapping (type_id, cat1, cat2)
            VALUES (#{contentTypeId}, #{cat1}, #{cat2})
            """)
    int insertTypeCategoryMapping(Category typeCatMaps);

    @Select("""
            SELECT DISTINCT c1.name
            FROM category1 c1
                JOIN type_category_mapping tcm on c1.cat1 = tcm.cat1
                JOIN content_type ct on tcm.type_id = ct.id
            WHERE ct.name = #{contentTypeName}
            """)
    List<String> selectCat1NamesByContentTypeNameOnMap(String contentTypeName);

    @Select("""
            SELECT c2.name
            FROM category2 c2
                JOIN type_category_mapping tcm on c2.cat2 = tcm.cat2
                JOIN content_type ct on tcm.type_id = ct.id
                JOIN category1 c1 on c2.cat1 = c1.cat1
            WHERE ct.name=#{contentTypeName} AND c1.name=#{cat1Name}
            """)
    List<String> selectCat2NamesByCat1NameOnMap(String contentTypeName, String cat1Name);

    @Select("""
            SELECT c3.name
            FROM category3 c3
                JOIN category2 c2 ON c3.cat2 = c2.cat2
            WHERE c2.name=#{cat2Name}
            """)
    List<String> selectCat3NamesByCat2Name(String cat2Name);

    @Select("""
            SELECT name
            FROM area
            """)
    List<String> selectAreaName();

    @Select("""
            SELECT s.name
            FROM sigungu s JOIN area a ON s.area_code = a.area_code
            WHERE a.name=#{areaName}
            """)
    List<String> selectSigunguNameByAreaName(String areaName);
}
