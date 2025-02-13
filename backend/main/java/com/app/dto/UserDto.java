package com.app.dto;

import com.app.pojos.UserRole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserDto  {
	private Long id;
	private String name;
    private String email;
    private String phone;
    private String password;
    
    private UserRole roles;
}
