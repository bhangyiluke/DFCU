package ug.dfcu.staff.controller;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import ug.dfcu.staff.exception.AppException;
import ug.dfcu.staff.exception.ResourceNotFoundException;
import ug.dfcu.staff.model.Role;
import ug.dfcu.staff.model.RoleName;
import ug.dfcu.staff.model.User;
import ug.dfcu.staff.payload.ApiResponse;
import ug.dfcu.staff.payload.JwtAuthenticationResponse;
import ug.dfcu.staff.payload.LoginRequest;
import ug.dfcu.staff.payload.SignUpRequest;
import ug.dfcu.staff.repository.RoleRepository;
import ug.dfcu.staff.repository.UserRepository;
import ug.dfcu.staff.security.JwtTokenProvider;
import ug.dfcu.staff.security.UserPrincipal;
import ug.dfcu.staff.service.OtpService;

@Validated
@RestController
// @CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    OtpService otpService;

    @Operation(summary = "User Login API", description = "This API allows systems users login and obtain JWT token for authorisation")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        // List<String> scope = authentication.getAuthorities()
        //         .stream()
        //         .map(GrantedAuthority::getAuthority)
        //         .collect(Collectors.toList());
        UserPrincipal user=(UserPrincipal)authentication.getPrincipal();
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,user));
    }

    @Operation(summary = "User Registration API", description = "This API allows systems users register their login accounts")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email Address already in use!"));
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }

    @Operation(summary = "OTP Request API", description = "This API allows systems users request One-Time-Password which will be sent to their provided email")
    @GetMapping("/request-otp/{email}")
    public ResponseEntity<?> requestOneTimePassword(@PathVariable String email)
            throws JsonProcessingException, UnsupportedEncodingException, MessagingException {
        otpService.generateToken(email);
        String message = String
                .format("To ensure authenticity, we have sent a One-Time-Password (OTP) to your email %s \n" +
                        "Please check your email and use the provided OPT to confirm\n" +
                        "Note: the OTP has a short lifespan", email);
        return ResponseEntity.ok().body(new ApiResponse(true, message));
    }

    @Operation(summary = "OTP Verification API", description = "This API allows the system to verify One-Time-Password from the first time staff")
    @GetMapping("/verify-otp")
    public ResponseEntity<?> verifyOneTimePassword(@RequestParam String otp) {
        boolean success = false;
        String message = "One-Time-Password(OTP) successfully verified";
        try {
            success = otpService.verifyToken(otp);
        } catch (ResourceNotFoundException e) {
            // e.printStackTrace();
            logger.warn("One-Time-Password(OTP) provided was not found");
        }
        if (!success) {
            message = "Wrong One-Time-Password(OTP) provided. Please provide the correct OTP";
            return ResponseEntity.badRequest().body(new ApiResponse(success, message));
        }

        return ResponseEntity.ok().body(new ApiResponse(success, message));
    }
}