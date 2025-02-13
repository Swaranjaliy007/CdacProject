package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.dto.UserDto;
import com.app.pojos.User;
@Repository
public interface UserRepository extends JpaRepository<User, Long>{


	Optional<User> findByEmail(String email);
	
	User findByPhone(String phone);

}
