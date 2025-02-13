//package com.app.service;
//
//
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.app.custom_exceptions.ResourceNotFoundException;
//import com.app.dto.DonateDto;
//import com.app.pojos.Donate;
//import com.app.repository.DonateRepository;
//
//@Service
//@Transactional
//public class DonateService implements IDonate {
//    @Autowired
//    private DonateRepository donateRepo;
//    
//    @Autowired
//    private ModelMapper mapper;
//    
//    @Override
//    public List<Donate> getAllDonations() {
//        return donateRepo.findAll().stream()
//                .map(donate -> mapper.map(donate, Donate.class))
//                .collect(Collectors.toList());
//    }
//    
//    @Override
//    public DonateDto getDonationById(Long id) {
//        Donate donate = donateRepo.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Donation not found"));
//        return mapper.map(donate, DonateDto.class);
//    }
//    
//    @Override
//    public Donate addDonation(DonateDto donateDto) {
//        Donate donate = mapper.map(donateDto, Donate.class);
//        return donateRepo.save(donate);
//    }
//    
//    @Override
//    public Donate updateDonation(Long id, DonateDto donateDto) {
//        Donate donate = donateRepo.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Donation not found"));
//        donate.setPayAmount(donateDto.getPayAmount());
//        donate.setDonationDate(donateDto.getDonationDate());
//        return donateRepo.save(donate);
//    }
//    
//    @Override
//    public String deleteDonation(Long id) {
//        Donate donate = donateRepo.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Donation not found"));
//        donateRepo.delete(donate);
//        return "Donation deleted successfully";
//    }
//}
package com.app.service;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.DonateDto;
import com.app.pojos.Donate;
import com.app.pojos.User;
import com.app.repository.DonateRepository;
import com.app.repository.UserRepository;

@Service
public class DonateService {

    @Autowired
    private DonateRepository donateRepository;
    @Autowired
  private ModelMapper mapper;
    @Autowired
    private UserRepository userRepository;

    // Make a donation
    public Donate makeDonation(Long userId, double amount) {
        Optional<User> userOpt = userRepository.findById(userId);
        
        if (userOpt.isPresent()) {
            Donate donation = new Donate();
            donation.setUser(userOpt.get());
            donation.setPayAmount(amount);
            donation.setDonationDate(LocalDate.now());

            Donate savedDonation = donateRepository.save(donation);
            return new Donate();
        }
        throw new RuntimeException("User not found");
    }
    public Donate addDonate(DonateDto donateDto) {
      Donate donate = mapper.map(donateDto, Donate.class);
      return donateRepository.save(donate);
  }

    // Get all donations
    public List<DonateDto> getAllDonations() {
    	return donateRepository.findAll().stream()
                .map(donate -> {
                    DonateDto donateDto = mapper.map(donate, DonateDto.class);
                    User user = donate.getUser();
                    if (user != null) {
                        donateDto.setUserId(user.getId()); // Set the userId in the DTO
                    }
                    return donateDto;
                })
                .collect(Collectors.toList());
  }

    // Get donation details by ID
    public DonateDto getDonationById(Long id) {
        Donate donation = donateRepository.findById(id).orElseThrow(() -> new RuntimeException("Donation not found"));
        return new DonateDto(donation.getDonationId(), donation.getUser().getId(), donation.getPayAmount(), donation.getDonationDate());
    }

    // Get donations made by a user
    public List<DonateDto> getDonationsByUser(Long userId) {
    	List<Donate> donate = donateRepository.findByUserId(userId);
        return donate.stream()
                .map(d -> {
                    DonateDto donateDto = mapper.map(d, DonateDto.class);
                    User user = d.getUser();
                    if (user != null) {
                        donateDto.setUserId(user.getId()); // Set the userId in the DTO
                    }
                    return donateDto;
                })
                .collect(Collectors.toList());
    }
	public String deleteDonation(Long donationId) {
		donateRepository.deleteById(donationId);
		return "Deleted";
	}

}

