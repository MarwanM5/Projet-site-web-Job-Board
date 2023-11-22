package com.epitech.jobboard.Controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import com.epitech.jobboard.JwtProvider;
import com.epitech.jobboard.Entities.People;
import com.epitech.jobboard.Services.PeopleService;
import com.epitech.jobboard.Enumeration.Role;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PeopleController {
    @Autowired
    private PeopleService service;

    @Autowired
    private JwtProvider jwtProvider;

    /**
     * Retrieves all People.
     * @return A list of all People
     */
    @GetMapping(value = "/people", produces = "application/json")
    public List<People> getAll() {
        return service.findAll();
    }

    /**
     * Retrieves a Person by ID
     * @param id The ID of the Person
     * @return The Person with the specified ID
     */
    @GetMapping("/people/{id}")
    public People getById(@PathVariable int id) {
        return service.findById(id);
    }

    /**
     * Retrieves a Person by email
     * @param email The email of the Person
     * @return The Person with the specified email
     */
    @GetMapping("/people/email/{email}")
    public People getByEmail(@PathVariable String email) {
        return service.findByEmail(email);
    }

    /**
     * Creates a Person
     * @param people The Person to create
     */
    @PostMapping("/people")
    public void create(@RequestBody People people) {
        service.create(people);
    }

    /**
     * Authenticates a user
     * @param credentials The email and password
     * @return The token
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        List<String> roles = new ArrayList<>();

        for (Role role : Role.values()) {
            roles.add(role.toString());
        }

        People user = service.findByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtProvider.generateToken(email, roles);
        return new ResponseEntity<>(Collections.singletonMap("token", token), HttpStatus.OK);
    }

    /**
     * Resets the password of a user
     * @param email A email of the user
     * @param password A new password
     */
    @PutMapping("/people/resetPassword/{email}/{password}")
    public void resetPassword(@PathVariable String email, @PathVariable String password) {
        People people = service.findByEmail(email);
        if (people == null) {
            throw new EntityNotFoundException("User with email " + email + " not found");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        service.updatePasswordByEmail(hashedPassword, email);
    }

    /**
     * Verifies the password of a user
     * @param email A email of the user
     * @param password A password
     * @return true if the password is correct
     */
    @GetMapping("/people/verifyPassword/{email}/{password}")
    public boolean verifyPassword(@PathVariable String email, @PathVariable String password) {
        People people = service.findByEmail(email);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(password, people.getPassword());
    }

    /**
     * Updates a Person
     * @param people The Person to update
     * @param authorizationHeader The Authorization header containing the token
     * @throws Exception If the token is invalid
     */
    @PutMapping("/people")
    public void update(@RequestBody People people, @RequestHeader(name = "Authorization") String authorizationHeader)
            throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            service.update(people);
        } else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Deletes a Person
     * @param id The ID of the Person to delete
     * @param authorizationHeader The Authorization header containing the token
     * @throws Exception If the token is invalid
     */
    @DeleteMapping("/people/{id}")
    public void delete(@PathVariable int id, @RequestHeader(name = "Authorization") String authorizationHeader)
            throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            service.deleteById(id);
        } else {
            throw new Exception("Token invalide");
        }
    }
}
