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
 * Retrieves a list of people from the API.
 *
 * @return {Promise} A promise that resolves to the list of people.
 */
function getPeople() {
    return axios.get('/api/people');
}

/**
 * Retrieves a person's information by their email.
 *
 * @param {string} email - The email of the person.
 * @return {Promise} A promise that resolves to the person's information.
 */
function getPersonByEmail(email) {
    return axios.get(`/api/people/email/${email}`);
}


/**
 * Sends a login request to the server with the provided email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @return {Promise} A Promise that resolves to the response of the login request.
 */
function login (email, password) {
    return axios.post('/api/login', {email, password});
}

/**
 * Retrieves information about a person from the API.
 *
 * @param {number} id - The ID of the person to retrieve.
 * @return {Promise} A promise that resolves with the person's information.
 */
function getPerson(id) {
    return axios.get(`/api/people/${id}`);
}

/**
 * Creates a new person in the API.
 *
 * @param {Object} person - The person object to be created.
 * @return {Promise} A promise that resolves to the response of the API call.
 */
function createPerson(person) {
    return axios.post('/api/people', person);
}

/**
 * Updates a person's information in the API.
 *
 * @param {object} person - The person object containing the updated information.
 * @return {Promise} A promise that resolves to the updated person object.
 */
function updatePerson(person) {
    return axios.put(`/api/people/`, person);
}

/**
 * Resets the password for a user.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The new password.
 * @return {Promise} - A promise that resolves to the result of the password reset request.
 */
function resetPassword (email, password) {
    return axios.put(`/api/people/resetPassword/${email}/${password}`);
}

/**
 * Verify the password for a given email.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password to verify.
 * @return {Promise} A promise that resolves with the result of the password verification.
 */
function verifyPassword(email, password) {
  return axios.get(`/api/people/verifyPassword/${email}/${password}`)
}

/**
 * Deletes a person with the specified ID.
 *
 * @param {string} id - The ID of the person to delete.
 * @return {Promise} A Promise that resolves when the person is deleted successfully.
 */
function deletePerson(id) {
    return axios.delete(`/api/people/${id}`);
}

const PeopleService = {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  getPersonByEmail,
  deletePerson,
  login, 
  resetPassword,
  verifyPassword
}

export default PeopleService;