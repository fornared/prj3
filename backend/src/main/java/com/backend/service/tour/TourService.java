package com.backend.service.tour;

import com.backend.domain.tour.Area;
import com.backend.domain.tour.Category;
import com.backend.domain.tour.Content;
import com.backend.mapper.tour.TourMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class TourService {
    private final TourMapper mapper;

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
            int dbCount = mapper.countExContentIdByContentId(content.getContentId());
            if (dbCount == 0) {
                mapper.insertContent(content);
            }
        }
    }
}
