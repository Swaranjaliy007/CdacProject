package com.app.service;

import java.util.List;

import com.app.dto.OrphanageDto;
import com.app.dto.StaffDto;
import com.app.pojos.Orphanage;
import com.app.pojos.Staff;

public interface IStaff {

	List<Staff> getAllStaffList();
	StaffDto getStaffById(Long id);
	Staff addStaff(Long orphanageId,StaffDto staffDto);
	Staff updateStaff(Long id,StaffDto staffDto);
	void deleteStaff(Long id);
}
