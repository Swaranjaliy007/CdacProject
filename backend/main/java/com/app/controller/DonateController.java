package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.DonateDto;
import com.app.pojos.Donate;
import com.app.service.DonateService;

//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.app.dto.DonateDto;
//import com.app.pojos.Donate;
//import com.app.service.DonateService;
//
//import io.swagger.v3.oas.annotations.parameters.RequestBody;
//
//@RestController
//@RequestMapping("/api/donations")
//public class DonateController {
//    @Autowired
//    private  DonateService donateService;
//
//    
//    
//    @PostMapping
//    public Donate createDonation(@RequestBody DonateDto donateDto) {
//        return donateService.addDonation(donateDto);
//    }
//
//    @GetMapping
//    public List<Donate> getAllDonations() {
//        return donateService.getAllDonations();
//    }
//
//    @GetMapping("/{id}")
//    public DonateDto getDonationById(@PathVariable Long id) {
//        return donateService.getDonationById(id);
//    }
//
//    @PutMapping("/{id}")
//    public Donate updateDonation(@PathVariable Long id, @RequestBody DonateDto donateDto) {
//        return donateService.updateDonation(id, donateDto);
//    }
//
//    @DeleteMapping("/{id}")
//    public String deleteDonation(@PathVariable Long id) {
//        return donateService.deleteDonation(id);
//    }
//}
@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "http://localhost:3000")
public class DonateController {

    @Autowired
    private DonateService donateService;

    @PostMapping("/{userId}")
    public ResponseEntity<Donate> makeDonation(@PathVariable Long userId, @RequestParam double amount) {
        return ResponseEntity.ok(donateService.makeDonation(userId, amount));
    }

    @GetMapping
    public ResponseEntity<?> getAllDonations() {
    	try {
            return ResponseEntity.ok(donateService.getAllDonations());
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
    	return null;
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonateDto> getDonationById(@PathVariable Long id) {
        return ResponseEntity.ok(donateService.getDonationById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DonateDto>> getDonationsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(donateService.getDonationsByUser(userId));
    }
    
    @DeleteMapping("/delete/{donationId}")
    public ResponseEntity<?> deleteById(@PathVariable Long donationId) {
        return ResponseEntity.ok(donateService.deleteDonation(donationId));
    }
}
