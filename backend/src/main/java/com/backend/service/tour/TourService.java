package com.backend.service.tour;

import com.backend.domain.tour.Area;
import com.backend.domain.tour.Category;
import com.backend.domain.tour.Content;
import com.backend.domain.tour.Image;
import com.backend.mapper.tour.TourMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class TourService {
    private final TourMapper mapper;

    public void setContentId(Content content) {
        Integer newId = mapper.selectIdByExContentId(content.getContentId());
        content.setId(newId);
    }

    public void addArea(List<Area> areas) {
        List<Integer> dbAreaCode = mapper.selectAreaCode();
        for (Area area : areas) {
            if (!dbAreaCode.contains(area.getAreaCode())) {
                mapper.insertArea(area);
            }
        }
    }

    public void addSigungu(List<Area> areas) {
        for (Area area : areas) {
            mapper.insertSigungu(area);
        }
    }

    public List<Integer> getAreaCode() {
        return mapper.selectAreaCode();
    }

    public void addCategory1(List<Category> categories) {
        List<String> dbCat1 = mapper.selectCat1();
        for (Category category : categories) {
            if (!dbCat1.contains(category.getCat1())) {
                mapper.insertCategory1(category);
            }
        }
    }

    public void addCategory2(List<Category> categories) {
        List<String> dbCat2 = mapper.selectCat2();
        for (Category category : categories) {
            if (!dbCat2.contains(category.getCat2())) {
                mapper.insertCategory2(category);
            }
        }
    }

    public void addCategory3(List<Category> categories) {
        List<String> dbCat3 = mapper.selectCat3();
        for (Category category : categories) {
            if (!dbCat3.contains(category.getCat3())) {
                mapper.insertCategory3(category);
            }
        }
    }

    public List<String> getCat1() {
        return mapper.selectCat1();
    }

    public List<String> getCat2() {
        return mapper.selectCat2();
    }

    public void addContentAndInfo1(List<Content> contents) {
        List<Integer> dbExContentId = mapper.selectExContentId();
        for (Content content : contents) {
            mapper.insertContent(content);
            mapper.insertInfo1(content);
        }
    }

    public void addContent(List<Content> contents) {
        for (Content content : contents) {
            int dbCount = mapper.countContentByExContentId(content.getContentId());
            if (dbCount == 0) {
                mapper.insertContent(content);
            }
        }
    }

    public void addInfo1(List<Content> contents) {
        int i = 0;
        for (Content content : contents) {
            // info1에 이미 있는 데이터가 아닐때만(0) 진행
            int dbCountInfo1 = mapper.countInfo1ByExContentIdOnContent(content.getContentId());
            // content에 있어야(1) info 데이터 삽입
            int dbCountContent = mapper.countContentByExContentId(content.getContentId());

            String mapxPattern = "^[0-9]{1,3}\\.[0-9]{1,10}$";
            String mapyPattern = "^[0-9]{1,2}\\.[0-9]{1,10}$";

            if (dbCountInfo1 == 0
                && dbCountContent == 1
                && content.getMapx().toString().matches(mapxPattern)
                && content.getMapy().toString().matches(mapyPattern)) {
                System.out.println(STR."\{i}: \{content.getContentId()}");
                mapper.insertInfo1(content);
            } else {
                System.out.println(STR."\{i}: \{content.getContentId()} - 입력실패");
            }

            i++;
        }
    }

    public void addInfo1detail(List<Content> contents) {
        for (Content content : contents) {
            setContentId(content);
            mapper.insertInfo1Detail(content);
        }
    }

    public void addImage(List<Image> images) {
        for (Image image : images) {
            Integer exContentId = image.getContentId();
            image.setContentId(mapper.selectIdByExContentId(exContentId));
            mapper.insertImage(image);
        }
    }

    public List<Content> list() {
        return mapper.selectAll();
    }

    public Map<String, Object> list(Integer page,
                                    Integer typeId,
                                    String catCode,
                                    Integer areaCode,
                                    Integer sigunguCode,
                                    String keyword) {
        Map<String, Object> pageInfo = new HashMap<>();
        Integer countAll = mapper.countAllWithSearch(typeId, catCode, areaCode, sigunguCode, keyword);

        Integer offset = (page - 1) * 12;
        Integer lastPageNum = (countAll - 1) / 12 + 1;
        Integer leftPageNum = (page - 1) / 10 * 10 + 1;
        Integer rightPageNum = leftPageNum + 9;
        rightPageNum = Math.min(rightPageNum, lastPageNum);
        Integer prevPageNum = leftPageNum - 1;
        Integer nextPageNum = leftPageNum + 10;

        pageInfo.put("prevPageNum", prevPageNum);
        pageInfo.put("nextPageNum", nextPageNum);
        pageInfo.put("currPageNum", page);
        pageInfo.put("lastPageNum", lastPageNum);
        pageInfo.put("leftPageNum", leftPageNum);
        pageInfo.put("rightPageNum", rightPageNum);

        return Map.of("pageInfo", pageInfo,
                "tourList", mapper.selectAllPaging(offset, typeId, catCode, areaCode, sigunguCode, keyword));
    }

    public Map<String, Object> get(Integer id) {
        Map<String, Object> result = new HashMap<>();

        Content info1 = mapper.selectContentInfoById(id);

        result.put("info1", info1);

        return result;
    }

    public Integer typeNameAsId(String typeName) {
        return mapper.selectTypeIdByName(typeName);
    }

    public String catNameAsCode(String catName) {
        return mapper.selectCatByName(catName);
    }

    public Integer areaNameAsCode(String areaName) {
        return mapper.selectAreaCodeByName(areaName);
    }

    public Integer sigunguNameAsCode(Integer areaCode, String sigunguName) {
        return mapper.selectSigunguCodeByName(areaCode, sigunguName);
    }
}
