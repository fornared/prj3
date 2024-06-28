package com.backend.controller.itinerary;

import com.backend.domain.itinerary.Itinerary;
import com.backend.domain.itinerary.ItineraryDetail;
import com.backend.service.itinerary.ItineraryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itinerary")
@RequiredArgsConstructor
public class ItineraryController {
    private final ItineraryService service;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity add(@RequestBody Itinerary Itinerary, Authentication auth) {
        System.out.println(Itinerary);

        service.add(Itinerary, auth);
        return null;
    }

    @PostMapping("add/detail")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addDetail(@RequestBody List<ItineraryDetail> visitList) {
        System.out.println(visitList);

        service.addDetail(visitList);
        return null;
    }

    @GetMapping("list")
    @PreAuthorize("isAuthenticated()")
    public List<Itinerary> list(Authentication auth) {
        return service.list(auth);
    }

    @GetMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public Itinerary get(@PathVariable Integer id, Authentication auth) {
        return null;
    }
}
