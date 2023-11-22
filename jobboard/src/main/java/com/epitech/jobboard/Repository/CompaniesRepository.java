package com.epitech.jobboard.Repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epitech.jobboard.Entities.Companies;

@Repository
public interface CompaniesRepository extends CrudRepository<Companies, Integer> {

    /**
     * Updates the company information in the database.
     *
     * @param  name            the new name of the company
     * @param  address         the new address of the company
     * @param  contact_email   the new email contact of the company
     * @param  id              the ID of the company to be updated
     */
    @Modifying
    @Query("Update Companies set name = :name, address = :address, contact_email = :contact_email where ID = :id")
    void update(@Param("name") String name, @Param("address") String address, @Param("contact_email") String contact_email, @Param("id") int id);
}
