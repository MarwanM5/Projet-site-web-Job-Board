package com.epitech.jobboard.Services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.epitech.jobboard.Entities.People;
import com.epitech.jobboard.Repository.PeopleRepository;

@Service
public class PeopleServiceImpl implements PeopleService {
    private final PeopleRepository repository;

    public PeopleServiceImpl(PeopleRepository repository) {
        this.repository = repository;
    }

    @Override
    public void create(People people) {
        repository.save(people);
    }

    @Override
    @Transactional
    public void update(People people) {
        people.setCompany(people.getCompany());
        people.setEmail(people.getEmail());
        people.setName(people.getName());
        people.setPassword(people.getPassword());
        repository.update(people.getName(), people.getEmail(), people.getPassword(), people.getCompany().getID(),
                people.getID());
    }
    
    @Override
    @Transactional
    public void updatePasswordByEmail(String password, String email) {
        repository.updatePassword(password, email);
    }

    @Override
    public void deleteById(int id) {
        repository.deleteById(id);
    }

    @Override
    public People findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public People findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public List<People> findAll() {
        return (List<People>) repository.findAll();
    }

    
}
