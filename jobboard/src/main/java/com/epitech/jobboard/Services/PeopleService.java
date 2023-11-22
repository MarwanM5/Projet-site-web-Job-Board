package com.epitech.jobboard.Services;

import java.util.List;

import javax.transaction.Transactional;

import com.epitech.jobboard.Entities.People;

public interface PeopleService {

    /**
     * Creates a Person
     * @param people The Person to create
     */
    void create(People people);

    /**
     * Updates a People object.
     *
     * @param  people  the People object to be updated
     */
    @Transactional
    void update(People people);

    /**
     * Updates the password associated with the given email.
     *
     * @param password  the new password to be set
     * @param email     the email associated with the password to be updated
     */
    @Transactional
    void updatePasswordByEmail(String password, String email);

    /**
     * Deletes a Person with the given ID
     * @param id The ID of the Person
     */
    void deleteById(int id);

    /**
     * Retrieves a Person by its ID
     * @param id The ID of the Person
     * @return The Person with the specified ID
     */
    People findById(int id);

    /**
     * Retrieves a Person by email
     * @param email The email of the Person
     * @return The Person with the specified email
     */
    People findByEmail(String email);
    
    /**
     * Retrieves all People
     * @return A list of all People
     */
    List<People> findAll();
}
