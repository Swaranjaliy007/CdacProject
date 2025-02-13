package com.app.service;



import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.OrphanageDto;
import com.app.pojos.Orphanage;
import com.app.repository.OrphanageRepository;


@Service
public class OrphanageService implements IOrphanage{
	@Autowired
    private  OrphanageRepository orphanageRepository;
	@Autowired
	private ModelMapper mapper;
	@Override
	public List<Orphanage> getAllorpList() {
		
		return orphanageRepository.findAll().stream().map(orphanage->mapper.map(orphanage, Orphanage.class))
				.collect(Collectors.toList());
	}
	@Override
	public OrphanageDto getOrpById(Long id) {
		Orphanage orp=orphanageRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("orphanage not found"));
		OrphanageDto orpdDto=mapper.map(orp, OrphanageDto.class);
		return orpdDto;
	}
	@Override
	public Orphanage addOrp(OrphanageDto orpDto) {
		System.out.println("received dto"+orpDto.getName()+","+orpDto.getAddress()+","+orpDto.getEmail()+","+orpDto.getContact());
		Orphanage neworp = new Orphanage();
//		 Hotel newHot = mapper.map(hotel, Hotel.class);
		neworp.setName(orpDto.getName());
		neworp.setAddress(orpDto.getAddress());
		neworp.setContact(orpDto.getContact());
		neworp.setEmail(orpDto.getEmail());
		System.out.println(neworp.getName()+","+neworp.getAddress()+","+neworp.getContact()+","+neworp.getEmail());
		return orphanageRepository.save(neworp);
	}
	@Override
	public Orphanage updateOrphanage(Long id, OrphanageDto orDto) {
		
		Orphanage orp =orphanageRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("orp not found"));
		orp.setName(orDto.getName());
		orp.setAddress(orDto.getAddress());
		orp.setEmail(orDto.getEmail());
		
		return orphanageRepository.save(orp);
	}
	@Override
	public String deleteorphanage(Long id) {
		Orphanage orp=orphanageRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("orp not found"));
		orphanageRepository.delete(orp);
		return "orp deleted";
	}

    

    
}

 