package com.backend.controller.tour;

import com.backend.domain.tour.Area;
import com.backend.domain.tour.Category;
import com.backend.domain.tour.Content;
import com.backend.service.tour.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        return null;
    }
}
