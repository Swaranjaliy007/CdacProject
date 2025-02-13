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

import com.app.dto.ChildDto;
import com.app.pojos.Child;
import com.app.service.ChildService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/childs")
@CrossOrigin(origins = "http://localhost:3000")
public class ChildController {
	@Autowired
	private ChildService childService;
	
	 @PostMapping("/{orphanageId}")
	    public Child createChild(@PathVariable Long orphanageId, @RequestBody  ChildDto child) {
		 try {
			 Child savedChild = childService.addChild(orphanageId, child);
		      return savedChild;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	        return null;
	    }

	    @GetMapping
	    public List<Child> getAllChild() {
	        return childService.getAllchildList();
	    }

	    @GetMapping("/{id}")
	    public ChildDto getChildById(@PathVariable Long id) {
	        return childService.getChildById(id);
	    }

	    @PutMapping("/{id}")
	    public Child updateChild(@PathVariable Long id, @RequestBody ChildDto child) {
	        return childService.updateChild(id, child);
	    }

	    @DeleteMapping("/{id}")
	    public String deleteChild(@PathVariable Long id) {
	        return childService.deleteChild(id);
	    }

}
