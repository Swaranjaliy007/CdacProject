package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AdoptedChildDto;
import com.app.dto.AdoptedChildRequest;
import com.app.pojos.AdoptedChild;
import com.app.service.AdoptedChildService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/adoptions")
@CrossOrigin(origins = "http://localhost:3000")
public class AdoptedChildController {
    @Autowired
    private AdoptedChildService adoptedChildService;

    public AdoptedChildController() {
		// TODO Auto-generated constructor stub
    	System.out.println("in adoptedChild ctr");
	}

//    @PostMapping
//    public AdoptedChild createAdoption(@RequestBody AdoptedChildDto adoptedChildDto) {
//        return adoptedChildService.addAdp(adoptedChildDto);
//    }

    @PostMapping("/create")
    public ResponseEntity<AdoptedChild> createAdoptedChild(@RequestBody AdoptedChildRequest request) {
        try {
            AdoptedChild createdChild = adoptedChildService.createAdoptedChild(request);
            System.out.println("Create");
            return new ResponseEntity<>(createdChild, HttpStatus.CREATED); // 201 Created
        } catch (EntityNotFoundException e) { // Catch specific exceptions
        	System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        }
    }

    @GetMapping
    public List<AdoptedChildDto> getAllAdoptions() {
        return adoptedChildService.getAdoptedList();
    }

    @GetMapping("/{id}")
    public AdoptedChildDto getAdoptionById(@PathVariable Long id) {
        return adoptedChildService.getchildById(id);
    }

    @PutMapping("/{id}")
    public AdoptedChild updateAdoption(@PathVariable Long id, @RequestBody AdoptedChildDto adoptedChildDto) {
        return adoptedChildService.updateAdp(id, adoptedChildDto);
    }

    @DeleteMapping("/{id}")
    public String deleteAdoption(@PathVariable Long id) {
        return adoptedChildService.deleteAdoptedChild(id);
    }
}