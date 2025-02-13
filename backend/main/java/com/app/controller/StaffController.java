package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

import com.app.dto.StaffDto;
import com.app.pojos.Staff;
import com.app.service.StaffService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class StaffController {
	@Autowired
	private StaffService staffService;
	
	
	 @PostMapping("/{orphanageId}")
	    public Staff createStaff(@PathVariable Long orphanageId, @RequestBody StaffDto staff) {
	        return staffService.addStaff(orphanageId, staff);
	    }

	    @GetMapping
	    public List<Staff> getAllStaff() {
	        return staffService.getAllStaffList();
	    }

	    @GetMapping("/{id}")
	    public StaffDto getStaffById(@PathVariable Long id) {
	        return staffService.getStaffById(id);
	    }

	    @PutMapping("/{id}")
	    public Staff updateStaff(@PathVariable Long id, @RequestBody StaffDto staff) {
	        return staffService.updateStaff(id, staff);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
	        try {
	            staffService.deleteStaff(id);
	            return ResponseEntity.ok("Staff deleted successfully.");
	        } catch (DataIntegrityViolationException e) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cannot delete staff due to foreign key constraints.");
	        } catch (EntityNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Staff not found.");
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting staff.");
	        }
	    }


	    
}    
	    