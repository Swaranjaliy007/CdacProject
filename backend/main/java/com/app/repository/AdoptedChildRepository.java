package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.AdoptedChild;

public interface AdoptedChildRepository extends JpaRepository<AdoptedChild, Long> {

}
