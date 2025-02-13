package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.AdoptedChildDto;
import com.app.dto.AdoptedChildRequest;
import com.app.dto.DonateDto;
import com.app.pojos.AdoptedChild;
import com.app.pojos.Child;
import com.app.pojos.User;
import com.app.repository.AdoptedChildRepository;
import com.app.repository.ChildRepository;
import com.app.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
@Transactional
public class AdoptedChildService implements IAdoptedChild{
	@Autowired
	public AdoptedChildRepository adRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
    private UserRepository userRepository; // Assuming you have a UserRepository

    @Autowired
    private ChildRepository childRepository; // Assuming you have a ChildRepository

	
    public List<AdoptedChildDto> getAdoptedList() {
        return adRepo.findAll().stream()
                .map(adoptedChild -> {
                    AdoptedChildDto dto = mapper.map(adoptedChild, AdoptedChildDto.class);

                    // Get Child ID
                    if (adoptedChild.getChild() != null) {  // Check for null
                        dto.setChildId(adoptedChild.getChild().getId()); // Assuming Child entity has an 'id'
                    }

                    // Get User ID (Assuming you have a User relationship)
                    if (adoptedChild.getUser() != null) { // Check for null
                        dto.setUserId(adoptedChild.getUser().getId()); // Assuming User entity has an 'id'
                    }
                    return dto;
                })
                .collect(Collectors.toList());
    }
	
//	return donate.stream()
//            .map(d -> {
//                DonateDto donateDto = mapper.map(d, DonateDto.class);
//                User user = d.getUser();
//                if (user != null) {
//                    donateDto.setUserId(user.getId()); // Set the userId in the DTO
//                }
//                return donateDto;
//            })
//            .collect(Collectors.toList());

	@Override
	public AdoptedChildDto getchildById(Long id) {
		AdoptedChild adopted = adRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("adoptedchild not found"));
        AdoptedChildDto adDto= mapper.map(adopted, AdoptedChildDto.class);
        return adDto;
	}

//	@Override
//	public AdoptedChild addAdp(AdoptedChildDto adDto) {
////		AdoptedChild adopted = mapper.map(adDto, AdoptedChild.class);
//		AdoptedChild adopted =new AdoptedChild();
//		adopted.setAdoptionDate(adDto.getAdoptionDate());
//        return adRepo.save(adopted);
//	}
	public AdoptedChild createAdoptedChild(AdoptedChildRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        Child child = childRepository.findById(request.getChildId())
                .orElseThrow(() -> new EntityNotFoundException("Child not found"));

        AdoptedChild adoptedChild = new AdoptedChild();
        adoptedChild.setAdoptionDate(request.getAdoptionDate());
        adoptedChild.setUser(user);
        adoptedChild.setChild(child);

        return adRepo.save(adoptedChild);
    }
	@Override
	public AdoptedChild updateAdp(Long id, AdoptedChildDto adDto) {
		AdoptedChild adopted=adRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("child not found"));
		adopted.setAdoptionDate(adDto.getAdoptionDate());
		return adRepo.save(adopted);
	}

	@Override
	public String deleteAdoptedChild(Long id) {
		 AdoptedChild adop = adRepo.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("child not found"));
		 adRepo.delete(adop);
	        return "Adoptedchild deleted successfully";
	}
}