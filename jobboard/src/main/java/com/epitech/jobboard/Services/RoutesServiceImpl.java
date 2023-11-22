package com.epitech.jobboard.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.epitech.jobboard.Repository.RoutesRepository;
import com.epitech.jobboard.Entities.Routes;

@Service
public class RoutesServiceImpl implements RoutesService {

    private final RoutesRepository repository;

    public RoutesServiceImpl(RoutesRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<Routes> getRoutes() {
        return (List<Routes>) repository.findAll();
    }
    
}
