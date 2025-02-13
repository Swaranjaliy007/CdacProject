package com.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.authorization.AuthnticatedAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.LoginRequest;
import com.app.dto.RegisterRequest;
import com.app.dto.UserDto;
import com.app.pojos.User;
//import com.app.pojos.User;
import com.app.pojos.UserRole;
import com.app.repository.UserRepository;
import com.app.security.JwtService;
import com.app.service.UserService;

//import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private  UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtUtil;
    private PasswordEncoder passwordEncoder;

//    @PostMapping("/create")
//    public ResponseEntity<User> createUser(@RequestBody RegisterRequest request) {
//    	System.out.println(request);
//    	System.out.println(request.getPassword());
//    	return ResponseEntity.ok(userService.RegisterUser(
//    			request.getName(),
//                request.getEmail(),
//                request.getPassword(),
//                request.getRoles()
//                
//        ));
//    }
    
    
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest request) {
        try {
            UserRole role = UserRole.valueOf(request.getRoles()); // Ensure case-insensitive role matching
            System.out.println(request.getName());
            User registeredUser = userService.RegisterUser(
                request.getName(),
                request.getPhone(),
                request.getEmail(),
                request.getPassword(),
                Set.of(role) // Convert to a Set<UserRole>
            );
            registeredUser.setRoles(Set.of(role));
            Map<String, String> response = new HashMap<>();
            response.put("message", "Registration successful!");
            response.put("email", registeredUser.getEmail());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());

            return ResponseEntity.badRequest().body(Map.of("error", "Invalid role: " + request.getRoles()));
        } catch (Exception e) {
           System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "User registration failed: " + e.getMessage()));
        }
    }

    
     /*
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest request) {
        try {
            UserRole role = UserRole.valueOf(request.getRoles()); // Convert String to enum
            User registeredUser = userService.RegisterUser(
                request.getName(),
                request.getEmail(),
                request.getPassword(),
                Set.of(role) // Pass the role as a Set<UserRole>
            );

            // Construct the success response
            Map<String, String> response = new HashMap<>();
            response.put("message", "Registration successful!");
            response.put("email", registeredUser.getEmail()); // Or any other data you want to send back

            return ResponseEntity.ok(response); // Return 200 OK with the response map

        } catch (IllegalArgumentException e) { // Handle invalid role strings
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid role: " + request.getRoles())); // Return 400 Bad Request
        } catch (Exception e) {  // Catch any other exception during registration
            // Important: Log the exception for debugging!
            e.printStackTrace(); // Or use a proper logger like SLF4j
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR) // Return 500 Internal Server Error
                    .body(Map.of("error", "User registration failed: " + e.getMessage())); // More informative error message
        }
    }
    
    
    */
    
    
//    @PostMapping("/create")
//    public ResponseEntity<?> createUser(@RequestBody RegisterRequest request) {
//        try {
//            User registeredUser = userService.RegisterUser(
//                request.getName(),
//                request.getEmail(),
//                request.getPassword(),
//                request.getRoles()
//            );
//
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "Registration successful!");
//            response.put("email", registeredUser.getEmail());
//
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(Map.of("error", "User registration failed: " + e.getMessage()));
//        }
//    }

    
    

    //Login user(authentication)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
       Authentication authentication=authenticationManager.authenticate(
    		   new UsernamePasswordAuthenticationToken(
    				   loginRequest.getEmail(),loginRequest.getPassword()));
       UserDetails userDetails = (UserDetails) authentication.getPrincipal();
       String token = jwtUtil.generateToken(userDetails);
      return ResponseEntity.ok(token);
      
    }    
    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserDto getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody UserDto user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}
