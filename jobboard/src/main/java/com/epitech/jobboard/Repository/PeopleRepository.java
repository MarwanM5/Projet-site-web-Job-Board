package com.epitech.jobboard.Repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epitech.jobboard.Entities.People;

@Repository
public interface PeopleRepository extends CrudRepository<People, Integer> {
    /**
     * Finds a person by their email address.
     *
     * @param  email the email address to search for
     * @return       the person object found, or null if not found
     */
    @Query("SELECT p FROM People p WHERE p.email = :email")
    People findByEmail(@Param("email") String email);

    /**
     * Updates a person's information.
     * @param name name of the person
     * @param email email of the person
     * @param password password of the person
     * @param company id of the company
     * @param id id of the person
     */
    @Modifying
    @Query("UPDATE People p SET p.name = :name, p.email = :email, p.password = :password, p.company.id = :company WHERE p.ID = :id")
    void update(@Param("name") String name, @Param("email") String email, @Param("password") String password,
            @Param("company") int company, @Param("id") int id);

    /**
     * Updates the password of a person with the given email.
     *
     * @param  password  the new password to be set
     * @param  email     the email of the person whose password needs to be updated
     */
    @Modifying
    @Query("UPDATE People p SET p.password = :password WHERE p.email = :email")
    void updatePassword(@Param("password") String password, @Param("email") String email);

}
