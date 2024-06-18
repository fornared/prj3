package com.backend.controller.tour;

import com.backend.domain.tour.Area;
import com.backend.domain.tour.Category;
import com.backend.domain.tour.Content;
import com.backend.domain.tour.Image;
import com.backend.service.tour.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tour")
@RequiredArgsConstructor
public class TourController {
    private final TourService service;

    @PostMapping("add/area")
    public ResponseEntity addArea(@RequestBody List<Area> areas) {
        System.out.println(areas);
        service.addArea(areas);
        return null;
    }

    @GetMapping("get/area")
    public List<Integer> getArea() {
        List<Integer> areaCode = service.getAreaCode();
        System.out.println(areaCode);

        return areaCode;
    }

    @PostMapping("add/sigungu")
    public ResponseEntity addSigungu(@RequestBody List<Area> sigungu) {
        service.addSigungu(sigungu);
        System.out.println(sigungu);

        return null;
    }

    @PostMapping("add/cat1")
    public ResponseEntity addCat1(@RequestBody List<Category> categories) {
        System.out.println(categories);
        service.addCategory1(categories);
        return null;
    }

    @GetMapping("get/cat1")
    public List<String> getCat1() {
        List<String> cat1 = service.getCat1();
        System.out.println(cat1);

        return cat1;
    }

    @PostMapping("add/cat2")
    public ResponseEntity addCat2(@RequestBody List<Category> categories) {
        System.out.println(categories);
        service.addCategory2(categories);
        return null;
    }

    @GetMapping("get/cat2")
    public List<String> getCat2() {
        List<String> cat2 = service.getCat2();
        System.out.println(cat2);

        return cat2;
    }

    @PostMapping("add/cat3")
    public ResponseEntity addCat3(@RequestBody List<Category> categories) {
        System.out.println(categories);
        service.addCategory3(categories);
        return null;
    }

    @PostMapping("add/content")
    public ResponseEntity addContent(@RequestBody List<Content> contents) {
        service.addContent(contents);

        return ResponseEntity.ok("데이터 저장 완료");
    }

    @PostMapping("add/info1")
    public ResponseEntity addInfo1(@RequestBody List<Content> contents) {
        service.addInfo1(contents);

        return ResponseEntity.ok("데이터 저장 완료");
    }

    @PutMapping("add/info1detail")
    public ResponseEntity addInfo1detail(@RequestBody List<Content> contents) {
        service.addInfo1detail(contents);
        System.out.println(contents);

        return ResponseEntity.ok().build();
    }

    @GetMapping("list0")
    public List<Content> list() {
        return service.list();
    }

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(defaultValue = "1") Integer page,
                                    @RequestParam(value = "type", required = false) String typeName,
                                    @RequestParam(value = "category", required = false) String catName,
                                    @RequestParam(value = "area", required = false) String areaName,
                                    @RequestParam(value = "sigungu", required = false) String sigunguName,
                                    @RequestParam(value = "keyword", required = false) String keyword) {
        Integer typeId = service.typeNameAsId(typeName);
        String catCode = service.catNameAsCode(catName);
        Integer areaCode = service.areaNameAsCode(areaName);
        Integer sigunguCode = service.sigunguNameAsCode(areaCode, sigunguName);
//        System.out.println(STR."\{page}, \{typeId}, \{catCode}, \{areaCode}, \{sigunguCode}, \{keyword}");
//        System.out.println(service.list(page, typeId, catCode, areaCode, sigunguCode, keyword));

        return service.list(page, typeId, catCode, areaCode, sigunguCode, keyword);
    }

    @PostMapping("get/searchOption")
    public ResponseEntity getSearchOption(@RequestBody List<String> options) {
        System.out.println(options);

        return null;
    }

    @GetMapping("list/{id}")
    public Map<String, Object> get(@PathVariable Integer id) {
        return service.get(id);
    }

    @PostMapping("add/image")
    public ResponseEntity addImage(@RequestBody List<Image> images) {
        System.out.println(images);
        service.addImage(images);

        return null;
    }
}
