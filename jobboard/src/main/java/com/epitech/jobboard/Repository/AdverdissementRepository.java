package com.epitech.jobboard.Repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.epitech.jobboard.Entities.Advertissement;

@Repository
public interface AdverdissementRepository extends CrudRepository<Advertissement, Integer> {
    /**
     * Updates an advertisement with the provided information.
     *
     * @param  title       the new title of the advertisement
     * @param  description the new description of the advertisement
     * @param  location    the new location of the advertisement
     * @param  salary      the new salary of the advertisement
     * @param  category    the new category of the advertisement
     * @param  company     the new company ID of the advertisement
     * @param  id          the ID of the advertisement to be updated
     */
    @Modifying
    @Query("Update Advertissement set title = :title, description = :description, location = :location, salary = :salary, category = :category, company_id = :company where ID = :id")
    void update(@Param("title") String title,
            @Param("description") String description,
            @Param("location") String location,
            @Param("salary") double salary,
            @Param("category") String category,
            @Param("company") int company,
            @Param("id") int id);
}
