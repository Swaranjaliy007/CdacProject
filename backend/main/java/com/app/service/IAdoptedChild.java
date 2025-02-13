package com.app.service;

import java.util.List;

import com.app.dto.AdoptedChildDto;
import com.app.dto.AdoptedChildRequest;
import com.app.dto.OrphanageDto;
import com.app.pojos.AdoptedChild;
import com.app.pojos.Orphanage;

public interface IAdoptedChild {

	List<AdoptedChildDto> getAdoptedList();
	AdoptedChildDto getchildById(Long id);
	AdoptedChild createAdoptedChild(AdoptedChildRequest request);
	AdoptedChild updateAdp(Long id,AdoptedChildDto adDto);
	String deleteAdoptedChild(Long id);
}
