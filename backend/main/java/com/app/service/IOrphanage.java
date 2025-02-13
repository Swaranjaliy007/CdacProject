package com.app.service;

import java.util.List;

import com.app.dto.OrphanageDto;
import com.app.pojos.Orphanage;

public interface IOrphanage {

	List<Orphanage> getAllorpList();
	OrphanageDto getOrpById(Long id);
	Orphanage addOrp(OrphanageDto orpDto);
	Orphanage updateOrphanage(Long id,OrphanageDto orDto);
	String deleteorphanage(Long id);
}
