package com.app.dto;

import com.app.pojos.UserRole;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter

public class AuthResponse extends BaseDto {

	  public AuthResponse(String token) {
		// TODO Auto-generated constructor stub
	}

	private String name;
	    private String email;
//	    private String password;
	   
	    private UserRole roles;
	

}
