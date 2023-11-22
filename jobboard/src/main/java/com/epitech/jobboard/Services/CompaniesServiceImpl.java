package com.epitech.jobboard.Services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epitech.jobboard.Entities.Companies;
import com.epitech.jobboard.Repository.CompaniesRepository;

@Service
public class CompaniesServiceImpl implements CompaniesService {
    
    @Autowired
    private CompaniesRepository repository;

    @Override
    public void create(Companies company) {
        repository.save(company);
    }

    @Override
    @Transactional
    public void update(Companies company) {
        company.setID(company.getID());
        company.setName(company.getName());
        company.setAddress(company.getAddress());
        company.setContact_email(company.getContact_email());
        repository.update(company.getName(), company.getAddress(), company.getContact_email(), company.getID());
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public Companies findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Companies> findAll() {
        return (List<Companies>) repository.findAll();
    }

        
}
