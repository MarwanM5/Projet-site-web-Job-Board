package com.epitech.jobboard.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.epitech.jobboard.Entities.Routes;

@Repository
public interface RoutesRepository extends CrudRepository<Routes, Integer>{
    
}
