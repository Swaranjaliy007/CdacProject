package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.pojos.Orphanage;

@Repository
public interface OrphanageRepository extends JpaRepository<Orphanage, Long>{}

