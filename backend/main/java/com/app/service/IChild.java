package com.app.service;

import java.util.List;

import com.app.dto.ChildDto;
import com.app.dto.OrphanageDto;
import com.app.pojos.Child;
import com.app.pojos.Orphanage;

public interface IChild {

	List<Child> getAllchildList();
	ChildDto getChildById(Long id);
	Child addChild(Long orpId,ChildDto childDto);
	Child updateChild(Long id,ChildDto childDto);
	String deleteChild(Long id);
}
