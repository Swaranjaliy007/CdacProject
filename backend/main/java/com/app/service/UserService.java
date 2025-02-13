package com.app.service;



import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.custom_exceptions.AuthenticationException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dto.LoginRequest;
import com.app.dto.UserDto;
import com.app.pojos.User;
import com.app.pojos.UserRole;
import com.app.repository.UserRepository;



@Service
@Transactional
public class UserService implements IUser {
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override//all users
    public List<User> getAllUsers() {
        return userRepo.findAll().stream()
                .map(user -> mapper.map(user, User.class))
                .collect(Collectors.toList());
    }
    
    @Override //get single by id
    public UserDto getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return mapper.map(user, UserDto.class);
    }
    
    
    @Override
    public User RegisterUser(String name, String phone, String email, String pass, Set<UserRole> roles) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(passwordEncoder.encode(pass)); // Encode the password!

        // Correctly set the roles.  No need for valueOf or singleton.
        user.setRoles(roles);  // Directly set the roles Set

        return userRepo.save(user);
    }
    
    
    
    
//    @Override
//    public User RegisterUser(String name,String email,String pass,Set<UserRole> role) {
//       // User user = mapper.map(userDto.getEmail(), User.class);
//    	
//        System.out.println(pass);
//        User user=new User();
//        user.setName(name);
//        user.setEmail(email);
//        user.setPassword(passwordEncoder.encode(pass));
//        user.setRoles(Collections.singleton(UserRole.valueOf(role)));
//        user.setRoles(Collections.singleton(role));
//        System.out.println(user.getRoles());
//        //user.setRoles(userDto.getRoles());
//        return userRepo.save(user);
//    }
//    
    
    
    //registration of user
//    @Override
//    public User RegisterUser(UserDto userDto) {
//        User user = mapper.map(userDto.getEmail(), User.class);
//        
//        user.setName(userDto.getName());
//        user.setEmail(userDto.getEmail());
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        user.setRoles(Collections.singleton(userDto.getRoles()));
//
//        //user.setRoles(userDto.getRoles());
//        return userRepo.save(user);
//    }
    @Override
	public String authenticateUser(LoginRequest loginreq) {
    	User user=userRepo.findByEmail(loginreq.getEmail()).orElseThrow(()->new AuthenticationException("invalid credentials"));
    		
    	if(!passwordEncoder.matches(loginreq.getPassword(),user.getPassword())) {
    	throw new RuntimeException("invalid email or password");
    	}
    	return "login successfully welcome"+user.getName();
		
		
	}
  
    
    @Override
    public User updateUser(Long id, UserDto userDto) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }
        return userRepo.save(user);
    }
    
    @Override
    public String deleteUser(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        userRepo.delete(user);
        return "User deleted successfully";
    }

	
    

}


 