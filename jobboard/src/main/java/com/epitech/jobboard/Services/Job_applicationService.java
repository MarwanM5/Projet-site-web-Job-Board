package com.epitech.jobboard.Services;

import java.util.List;

import javax.transaction.Transactional;

import com.epitech.jobboard.Entities.Job_application;

public interface Job_applicationService {
    /**
     * Creates a new Job_application
     * @param job_application A new Job_application
     */
    void create(Job_application job_application);

    /**
     * Updates the status of a job application.
     *
     * @param  job_application  the job application to update
     */
    @Transactional
    void updateStatus(Job_application job_application);

    /**
     * Deletes a Job_application
     * @param id The ID of the Job_application to delete
     */
    void deleteById(int id);
    
    /**
     * Retrieves a Job_application by its ID
     * @param id The ID of the Job_application
     * @return The Job_application with the specified ID
     */
    Job_application findById(int id);

    /**
     * Retrieves all Job_applications by Poste
     * @param id The ID of the Poste
     * @return A list of all Job_applications with the specified Poste
     */
    List<Job_application> findByPoste(int id);

    /**
     * Retrieves all Job_applications by Person
     * @param id The ID of the Person
     * @return A list of all Job_applications with the specified Person
     */
    List<Job_application> findByPerson(int id);

    /**
     * Retrieves all Job_applications
     * @return A list of all Job_applications
     */
    List<Job_application> findAll();
}
