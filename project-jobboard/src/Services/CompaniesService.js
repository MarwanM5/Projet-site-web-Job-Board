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
 * Retrieves a list of companies from the API.
 *
 * @return {Promise} A Promise that resolves to the response data.
 */
function getCompanies() {
    return axios.get('/api/companies')
}

/**
 * Retrieves a company by its ID.
 *
 * @param {string} id - The ID of the company.
 * @return {Promise} A promise that resolves to the company data.
 */
function getCompanyById(id) {
    return axios.get(`/api/companies/${id}`);
}

/**
 * Creates a new company by sending a POST request to the '/api/companies' endpoint.
 *
 * @param {Object} company - The company object containing the details of the company to be created.
 * @return {Promise} Returns a promise that resolves to the response from the server.
 */
function createCompany(company) {
    return axios.post('/api/companies', company);
}

/**
 * Updates a company.
 *
 * @param {Object} company - The company object to be updated.
 * @return {Promise} A promise that resolves with the updated company object.
 */
function updateCompany(company) {
    return axios.put(`/api/companies/`, company);
}

/**
 * Deletes a company with the specified ID.
 *
 * @param {number} id - The ID of the company to delete.
 * @return {Promise} A promise that resolves to the result of the delete operation.
 */
function deleteCompany(id) {
    return axios.delete(`/api/companies/${id}`);
}

const CompaniesService = {
        getCompanies,
        getCompanyById,
        createCompany,
        updateCompany,
    deleteCompany
};

export default CompaniesService;