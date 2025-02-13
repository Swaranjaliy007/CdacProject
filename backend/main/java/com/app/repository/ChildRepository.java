package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.dto.ChildDto;
import com.app.pojos.Child;
import com.app.pojos.Orphanage;


public interface ChildRepository extends JpaRepository<Child, Long>{

	}

