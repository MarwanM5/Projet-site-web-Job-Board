package com.epitech.jobboard.Services;

import java.util.List;

import javax.transaction.Transactional;

import com.epitech.jobboard.Entities.Advertissement;


public interface AdvertissementService {
    /**
     * Creates a new Advertissement.
     * @param advert The Advertissement to create
     */
    void create(Advertissement advert);

    /**
     * Updates an advertisement.
     *
     * @param  advert  the advertisement to be updated
     */
    @Transactional
    void update(Advertissement advert);
    
    /**
     * Deletes an advertisement.
     * @param id The ID of the advertisement to delete
     */
    void deleteById(int id);

    /**
     * Retrieves an advertisement by its ID.
     * @param id The ID of the advertisement
     * @return The advertisement with the specified ID
     */
    Advertissement findById(int id);

    /**
     * Retrieves all advertisements
     * @return A list of all advertisements
     */
    List<Advertissement> findAll();
}
