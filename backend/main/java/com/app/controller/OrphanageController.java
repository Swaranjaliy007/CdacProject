package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrphanageDto;
import com.app.pojos.Orphanage;
import com.app.service.OrphanageService;


@RestController
@RequestMapping("/api/orphanages")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend access

public class OrphanageController {
	@Autowired
    private  OrphanageService orphanageService;

    public OrphanageController(OrphanageService orphanageService) {
        this.orphanageService = orphanageService;
    }

    @PostMapping
    public Orphanage createOrphanage(@RequestBody OrphanageDto orphanage) {
        return orphanageService.addOrp(orphanage);
    }

    @GetMapping
    public List<Orphanage> getAllOrphanages() {
        return orphanageService.getAllorpList();
    }

    @GetMapping("/{id}")
    public OrphanageDto getOrphanageById(@PathVariable Long id) {
        return orphanageService.getOrpById(id);
    }

    @PutMapping("/{id}")
    public Orphanage updateOrphanage(@PathVariable Long id, @RequestBody OrphanageDto orphanage) {
        return orphanageService.updateOrphanage(id, orphanage);
    }

    @DeleteMapping("/{id}")
    public String deleteOrphanage(@PathVariable Long id) {
        return orphanageService.deleteorphanage(id);
    }
}
