package com.epitech.jobboard.Controllers;

import com.epitech.jobboard.Services.AdvertissementService;
import com.epitech.jobboard.JwtProvider;
import com.epitech.jobboard.Entities.Advertissement;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AdverdissementController {

    @Autowired
    private AdvertissementService service;

    @Autowired
    private JwtProvider jwtProvider;

    /**
     * Retrieves all Advertissements.
     *
     * @param authorizationHeader The Authorization header containing the token.
     * @return The list of all Advertissements.
     * @throws Exception If the token is invalid.
     */
    @GetMapping(value = "/advertissements", produces = "application/json")
    public List<Advertissement> getAll(@RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {

        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            return service.findAll();
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Retrieves an Advertissement by its ID.
     *
     * @param id                   The ID of the Advertissement to retrieve.
     * @param authorizationHeader  The Authorization header containing the token.
     * @return The Advertissement with the specified ID.
     * @throws Exception If the token is invalid.
     */
    @GetMapping("/advertissements/{id}")
    public Advertissement getById(@PathVariable int id,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            return service.findById(id);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Creates a new Advertissement.
     *
     * @param advert              The Advertissement to create.
     * @param authorizationHeader The Authorization header containing the token.
     * @throws Exception If the token is invalid.
     */
    @PostMapping("/advertissements")
    public void create(@RequestBody Advertissement advert,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            service.create(advert);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Updates an existing Advertissement.
     *
     * @param advert              The Advertissement to update.
     * @param authorizationHeader The Authorization header containing the token.
     * @throws Exception If the token is invalid.
     */
    @PutMapping("/advertissements")
    public void update(@RequestBody Advertissement advert,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            service.update(advert);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Deletes an Advertissement by its ID.
     *
     * @param id                   The ID of the Advertissement to delete.
     * @param authorizationHeader  The Authorization header containing the token.
     * @throws Exception If the token is invalid.
     */
    @DeleteMapping("/advertissements/{id}")
    public void delete(@PathVariable int id, @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            service.deleteById(id);
        }
        else {
            throw new Exception("Token invalide");
        }
    }
}
