import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

/**
 * Gets all advertisements from the API
 * 
 * @return {Promise} A promise that resolves to an array of advertisements
 */
function getAdvertissement () {
    return axios.get('/api/advertissements');
}

/**
 * Retrieves an advertisement by ID.
 *
 * @param {number} id - The ID of the advertisement.
 * @return {Promise} A promise that resolves to the advertisement data.
 */
function getAdvertissementById (id) {
    return axios.get(`/api/advertissements/${id}`);
}

/**
 * Creates an adverstisement.
 *
 * @param {Object} advertissement - The adverstisement object to be created.
 * @return {Promise} A promise that resolves to the created adverstisement.
 */
function createAdvertissement (advertissement) {
    return axios.post('/api/advertissements', advertissement);
}

/**
 * Updates an advertisement.
 *
 * @param {Object} advertissement - The advertisement to be updated.
 * @return {Promise} - A promise that resolves with the updated advertisement.
 */
function updateAdvertissement (advertissement) {
    return axios.put(`/api/advertissements/`, advertissement);
}

/**
 * Deletes an advertisement with the given ID.
 *
 * @param {number} id - The ID of the advertisement to delete.
 * @return {Promise} A promise that resolves to the result of the delete operation.
 */
function deleteAdvertissement (id) {
    return axios.delete(`/api/advertissements/${id}`);
}

const AdvertissementService = {
    getAdvertissement,
    getAdvertissementById,
    createAdvertissement,
    updateAdvertissement,
    deleteAdvertissement
};

export default AdvertissementService;
