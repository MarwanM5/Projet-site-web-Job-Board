package com.epitech.jobboard.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.epitech.jobboard.Entities.Routes;

@Service
public interface RoutesService {

    /**
     * Retrieves all Routes
     * @return The list of all Routes
     */
    List<Routes> getRoutes();
}
