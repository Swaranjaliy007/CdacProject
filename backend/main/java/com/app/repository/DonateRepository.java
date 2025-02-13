package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Donate;
import com.app.pojos.User;

public interface DonateRepository extends JpaRepository<Donate, Long>{

	List<Donate> findByUserId(Long userId);

}
