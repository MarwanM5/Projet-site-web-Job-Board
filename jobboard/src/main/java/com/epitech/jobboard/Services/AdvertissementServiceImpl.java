package com.epitech.jobboard.Services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epitech.jobboard.Repository.AdverdissementRepository;

import com.epitech.jobboard.Entities.Advertissement;

@Service
public class AdvertissementServiceImpl  implements AdvertissementService {

    @Autowired
    private AdverdissementRepository repository;

    @Override
    public void create(Advertissement advert) {
        repository.save(advert);
    }

    @Override
    @Transactional
    public void update(Advertissement advert) {
        advert.setCategory(advert.getCategory());
        advert.setDescription(advert.getDescription());
        advert.setLocation(advert.getLocation());
        advert.setSalary(advert.getSalary());
        advert.setTitle(advert.getTitle());
        advert.setCompany(advert.getCompany());
        repository.update(advert.getTitle(), advert.getDescription(), advert.getLocation(), advert.getSalary(), advert.getCategory(), advert.getCompany().getID(), advert.getID());
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public Advertissement findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Advertissement> findAll() {
        return (List<Advertissement>) repository.findAll();
    }
    
}
