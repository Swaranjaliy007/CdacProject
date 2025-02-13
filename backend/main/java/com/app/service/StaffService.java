package com.app.service;



import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.StaffDto;
import com.app.pojos.Orphanage;
import com.app.pojos.Staff;
import com.app.repository.OrphanageRepository;
import com.app.repository.StaffRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
@Transactional
public class StaffService implements IStaff{
	@Autowired
    private  StaffRepository staffRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private OrphanageRepository orphanageRepository;
	@Override
	public List<Staff> getAllStaffList() {
		
		return staffRepo.findAll().stream().map(staff->mapper.map(staff,Staff.class))
				.collect(Collectors.toList());
	}
	@Override
	public StaffDto getStaffById(Long id) {
		Staff staff=staffRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("Staff not found"));
		StaffDto staffDto=mapper.map(staff, StaffDto.class);
		return staffDto;
	}
	@Override
	public Staff addStaff(Long orphanageId, StaffDto staffDto) {
		Orphanage orphanage = orphanageRepository.findById(orphanageId)
                .orElseThrow(() -> new RuntimeException("Orphanage not found"));
		Staff staff=new Staff();
		staff.setName(staffDto.getName());
		staff.setContactNo(staffDto.getContactNo());
		staff.setHireDate(staffDto.getHireDate());
		staff.setOrphanage(orphanage);
		return staffRepo.save(staff);
	}
	@Override
	public Staff updateStaff(Long id, StaffDto staffDto) {
		Staff staff=staffRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Staff not fouund"));
		staff.setName(staffDto.getName());
		staff.setContactNo(staffDto.getContactNo());
		staff.setHireDate(staffDto.getHireDate());
		return staffRepo.save(staff);
	}
	@Override
	public void deleteStaff(Long id) {
	    Staff staff = staffRepo.findById(id)
	            .orElseThrow(() -> new EntityNotFoundException("Staff not found"));

	    staffRepo.delete(staff);
	}


    

    
}

 