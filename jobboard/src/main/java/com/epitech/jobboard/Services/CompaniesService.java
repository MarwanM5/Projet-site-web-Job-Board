package com.epitech.jobboard.Services;

import java.util.List;

import javax.transaction.Transactional;

import com.epitech.jobboard.Entities.Companies;

public interface CompaniesService {

    /**
     * Creates a new Company
     * @param company A new Company
     */
    void create(Companies company);

    /**
     * Update the given Companies object.
     *
     * @param  company  the Companies object to be updated
     */
    @Transactional
    void update(Companies company);

    /**
     * Deletes a Company
     * @param id The ID of the Company to delete
     */
    void deleteById(int id);

    /**
     * Retrieves a Company by its ID
     * @param id A company ID
     * @return The Company with the specified ID
     */
    Companies findById(int id);

    /**
     * Retrieves all Companies
     * @return A list of all Companies
     */
    List<Companies> findAll();

}
