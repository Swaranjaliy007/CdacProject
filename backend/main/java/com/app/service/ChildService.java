package com.app.service;



import java.util.List;
import java.util.stream.Collectors;

import javax.management.RuntimeErrorException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.ChildDto;
import com.app.pojos.Child;
import com.app.pojos.Orphanage;
import com.app.repository.ChildRepository;
import com.app.repository.OrphanageRepository;


@Service
public class ChildService implements IChild{
	@Autowired
    private  ChildRepository childRepo;
	 @Autowired
	    private OrphanageRepository orphanageRepository;
	@Autowired
	private ModelMapper mapper;
	@Override
	public List<Child> getAllchildList() {
		
		return childRepo.findAll().stream().map(child->mapper.map(child,Child.class))
				.collect(Collectors.toList());
	}
	@Override
	public ChildDto getChildById(Long id) {
		Child child=childRepo.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("child not found"));
		ChildDto childDto=mapper.map(child, ChildDto.class);
		return childDto;
	}
	@Override
	public Child addChild(Long orpId,ChildDto childDto) {
		Orphanage orphanage =orphanageRepository.findById(orpId)
				.orElseThrow(()-> new ResourceNotFoundException("orphanage not found"));
		Child child=new Child();
		child.setName(childDto.getName());
		child.setAge(childDto.getAge());
		child.setGender(childDto.getGender());
		child.setOrphanage(orphanage);
		return childRepo.save(child);
	}
	@Override
	public Child updateChild(Long id, ChildDto childDto) {
		Child child=childRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("child not fouund"));
		child.setName(childDto.getName());
		child.setAge(childDto.getAge());
		return childRepo.save(child);
	}
	@Override
	public String deleteChild(Long id) {
		Child child=childRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("child not fouund"));
		childRepo.delete(child);
		return "child deleted";
	}
	
    

    
}

 