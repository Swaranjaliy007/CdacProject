package com.app.service;

import java.util.List;
import java.util.Set;

import com.app.dto.LoginRequest;
import com.app.dto.UserDto;
import com.app.pojos.User;
import com.app.pojos.UserRole;

public interface IUser {

	
	List<User> getAllUsers();
    UserDto getUserById(Long id);
    //User RegisterUser(String name,String email,String pass);
    String authenticateUser(LoginRequest login);
    User updateUser(Long id, UserDto userDto);
    String deleteUser(Long id);
	//User RegisterUser(String name, String email, String pass, String role);
	User RegisterUser(String name, String phone, String email, String pass, Set<UserRole> role);
	
	
}
