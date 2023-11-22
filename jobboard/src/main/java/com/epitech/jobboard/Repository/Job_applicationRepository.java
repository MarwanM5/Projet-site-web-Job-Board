package com.epitech.jobboard.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epitech.jobboard.Entities.Job_application;
import com.epitech.jobboard.Enumeration.Status;

@Repository
public interface Job_applicationRepository extends CrudRepository<Job_application, Integer> {
    /**
     * Updates the status of a job application.
     *
     * @param  status  the new status to set for the job application
     * @param  id      the ID of the job application to update
     */
    @Modifying
    @Query("Update Job_application p SET p.status = :status WHERE p.ID = :id")
    void updateStatus(@Param("status") Status status, @Param("id") int id);

    /**
     * Retrieves a list of job applications for a given person ID.
     *
     * @param  id  the ID of the person
     * @return     a list of job applications
     */
    @Query("SELECT p FROM Job_application p WHERE p.person.id = :id")
    List<Job_application> findByPerson(@Param("id") int id);

    /**
     * Finds a list of job applications by advertisement ID.
     *
     * @param  id  the ID of the advertisement
     * @return     a list of job applications
     */
    @Query("SELECT p FROM Job_application p WHERE p.advertissement.id = :id")
    List<Job_application> findByPoste(@Param("id") int id);
}
