package com.epitech.jobboard.Controllers;

import java.util.List;

import com.epitech.jobboard.JwtProvider;
import com.epitech.jobboard.Entities.Job_application;
import com.epitech.jobboard.Services.Job_applicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class Job_applicationController {
    @Autowired
    private Job_applicationService service;

    @Autowired
    private JwtProvider jwtProvider;

    /**
     * Retrieves all Job_applications.
     * @param authorizationHeader The Authorization header containing the token
     * @return The list of all Job_applications
     * @throws Exception If the token is invalid
     */
    @GetMapping(value = "/job_applications", produces = "application/json")
    public List<Job_application> getAll(@RequestHeader(name = "Authorization") String authorizationHeader)
            throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if(jwtProvider.validateToken(token)) {
            return service.findAll();
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Retrieves a Job_application by its ID
     * @param id The ID of the Job_application
     * @param authorizationHeader The Authorization header containing the token
     * @return The Job_application with the specified ID
     * @throws Exception If the token is invalid
     */
    @GetMapping("/job_applications/{id}")
    public Job_application getById(@PathVariable int id,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            return service.findById(id);
        } else {
            throw new Exception("Token invalide");
        }
    }
    
    /**
     * Retrieves a Job_application by person ID
     * @param id The ID of the Person
     * @param authorizationHeader The Authorization header containing the token
     * @return The Job_application with the specified ID
     * @throws Exception If the token is invalid
     */
    @GetMapping("/job_applications/person/{id}")
    public List<Job_application> getByPerson(@PathVariable int id, @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");
        if(jwtProvider.validateToken(token)) {
            return service.findByPerson(id);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Retrieves a Job_application by Poste ID
     * @param id The ID of the Poste
     * @param authorizationHeader The Authorization header containing the token
     * @return The Job_application with the specified ID
     * @throws Exception If the token is invalid
     */
    @GetMapping("/job_applications/poste/{id}")
    public List<Job_application> getByPoste(@PathVariable int id, @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");
        if (jwtProvider.validateToken(token)) {
            return service.findByPoste(id);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Creates a new Job_application
     * @param job_application A new Job_application
     * @param authorizationHeader The Authorization header containing the token
     * @throws Exception If the token is invalid
     */
    @PostMapping("/job_applications")
    public void create(@RequestBody Job_application job_application,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");
        if (jwtProvider.validateToken(token)) {
            service.create(job_application);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Updates an existing Job_application
     * @param job_application A new Job_application
     * @param authorizationHeader The Authorization header containing the token
     * @throws Exception If the token is invalid
     */
    @PutMapping("/job_applications")
    public void update(@RequestBody Job_application job_application,
            @RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        String token = authorizationHeader.replace("Bearer ", "");

        if (jwtProvider.validateToken(token)) {
            service.updateStatus(job_application);
        }
        else {
            throw new Exception("Token invalide");
        }
    }

    /**
     * Deletes a Job_application
     * @param id The ID of the Job_application to delete
     * @param authorizationHeader The Authorization header containing the token
     * @throws Exception If the token is invalid
     */
    @DeleteMapping("/job_applications/{id}")
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
