package com.epitech.jobboard.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.epitech.jobboard.Services.CompaniesService;
import com.epitech.jobboard.JwtProvider;
import com.epitech.jobboard.Entities.Companies;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CompaniesController {
    @Autowired
    private CompaniesService service;

    @Autowired
    private JwtProvider jwtProvider;

    /**
     * Retrieves all Companies.
     * @return A list of all Companies
     */
    @GetMapping(value = "/companies", produces = "application/json")
    public List<Companies> getAll() {
        return service.findAll();
    }

    /**
     * Retrieves a Company by its ID.
     * @param id A company ID
     * @param authorizationHeader The Authorization header containing the token.
     * @return The Company with the specified ID
     * @throws Exception If the token is invalid
     */
    @GetMapping("/companies/{id}")
    public Companies getById(@PathVariable int id, @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if(jwtProvider.validateToken(token)) {
            return service.findById(id);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Creates a new Company.
     * @param company A new Company
     * @param authorizationHeader The Authorization header containing the token.
     * @throws Exception If the token is invalid
     */
    @PostMapping("/companies")
    public void create(@RequestBody Companies company,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            service.create(company);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Updates an existing Company.
     * @param company A new Company
     * @param authorizationHeader The Authorization header containing the token.
     * @throws Exception If the token is invalid
     */
    @PutMapping("/companies")
    public void update(@RequestBody Companies company,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if(jwtProvider.validateToken(token)) {
            service.update(company);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Deletes a Company by its ID.
     * @param id The ID of the Company to delete
     * @param authorizationHeader The Authorization header containing the token
     * @throws Exception If the token is invalid
     */
    @DeleteMapping("/companies/{id}")
    public void delete(@PathVariable int id, @RequestHeader(name = "Authorization") String authorizationHeader)
            throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            service.deleteById(id);
        }
        else {
            throw new Exception("Token invalide");
        }
    }
}
