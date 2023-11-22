package com.epitech.jobboard.Services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epitech.jobboard.Entities.Job_application;
import com.epitech.jobboard.Repository.Job_applicationRepository;

@Service
public class Job_applicationServiceImpl implements Job_applicationService {
    
    @Autowired
    private Job_applicationRepository repository;

    @Override
    public void create(Job_application job_application) {
        repository.save(job_application);
    }

    @Override
    @Transactional
    public void updateStatus(Job_application job_application) {
        job_application.setStatus(job_application.getStatus());
        repository.updateStatus(job_application.getStatus(), job_application.getID());
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public Job_application findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Job_application> findByPoste(int id) {
        return (List<Job_application>) repository.findByPoste(id);
    }
    
    @Override
    public List<Job_application> findByPerson(int id) {
        return (List<Job_application>) repository.findByPerson(id);
    }

    @Override
    public List<Job_application> findAll() {
        return (List<Job_application>) repository.findAll();
    }
    
}
