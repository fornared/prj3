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
import java.util.Map;

@RestController
@RequestMapping("/api/itinerary")
@RequiredArgsConstructor
public class ItineraryController {
    private final ItineraryService service;

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity add(@RequestBody Itinerary Itinerary, Authentication auth) {
        service.add(Itinerary, auth);
        return null;
    }

    @PostMapping("add/detail")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity addDetail(@RequestBody List<ItineraryDetail> visitList) {
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
    public Map<String, Object> get(@PathVariable Integer id) {
        return service.get(id);
    }

    @PutMapping("{id}/modify/detail")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity modifyDetail(@RequestBody List<ItineraryDetail> visitList) {
        service.modifyDetail(visitList);
        return null;
    }

    @DeleteMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity delete(@PathVariable Integer id) {
        service.remove(id);
        return null;
    }
}
