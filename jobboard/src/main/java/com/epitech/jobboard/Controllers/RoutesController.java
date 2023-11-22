package com.epitech.jobboard.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.epitech.jobboard.Services.RoutesService;
import com.epitech.jobboard.Entities.Routes;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RoutesController {
    
    @Autowired
    private RoutesService service;

    /**
     * Retrieves all Routes
     * @param authorizationHeader The Authorization header containing the token
     * @return The list of all Routes
     * @throws Exception If the token is invalid
     */
    @GetMapping(value = "/routes", produces = "application/json")
    public List<Routes> getAll(@RequestHeader(name = "Authorization") String authorizationHeader) throws Exception {
        return service.getRoutes();
    }
}
