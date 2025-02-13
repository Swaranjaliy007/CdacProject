package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    private String email;
    private String password;
    private String phone;
    private String name;
    private String roles; // Changed to String
}






//package com.app.dto;
//
//import java.util.Set;
//
//import com.app.pojos.UserRole;
//
//import lombok.*;
//
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//public class RegisterRequest {
////    public RegisterRequest(String email, String password, String name) {
////		super();
////		this.email = email;
////		this.password = password;
////		this.name = name;
////	}
//	private String email;
//    private String password;
//    private String name;
//    private String roles;
////	public String getEmail() {
////		return email;
////	}
////	public void setEmail(String email) {
////		this.email = email;
////	}
////	public String getPassword() {
////		return password;
////	}
////	public void setPassword(String password) {
////		this.password = password;
////	}
////	public String getName() {
////		return name;
////	}
////	public void setName(String name) {
////		this.name = name;
////	}
////	public RegisterRequest() {
////		super();
////		// TODO Auto-generated constructor stub
////	}
//    
//}
//
