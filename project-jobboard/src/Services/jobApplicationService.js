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
 * Retrieves all job applications from the API.
 *
 * @return {Promise} A promise that resolves to the response data.
 */
function getJobApplications() {
  return axios.get('/api/job_applications');
}

/**
 * Retrieves a job application by its ID.
 *
 * @param {number} id - The ID of the job application.
 * @return {Promise} A promise that resolves to the job application data.
 */
function getJobApplicationById(id) {
  return axios.get(`/api/job_applications/${id}`);
}

/**
 * Retrieves a job application by its poste ID.
 *
 * @param {number} id - The ID of the poste.
 * @return {Promise} A promise that resolves to the job application object.
 */
function getJobApplicationByIdPoste(id) {
  return axios.get(`/api/job_applications/poste/${id}`);
}

/**
 * Retrieves a job application by the ID of the person.
 *
 * @param {number} id - The ID of the person.
 * @return {Promise} A promise that resolves to the job application data.
 */
function getJobApplicationByIdPerson(id) {
  return axios.get(`/api/job_applications/person/${id}`);
}

/**
 * Creates a job application.
 *
 * @param {object} jobApplication - The job application to be created.
 * @param {number} jobApplication.advertisement_id - The ID of the advertisement.
 * @param {number} jobApplication.person_id - The ID of the person.
 * @param {boolean} jobApplication.email_sent - Indicates if email was sent.
 * @param {string} jobApplication.status - The status of the application.
 * @return {Promise} A promise that resolves to the created job application.
 */
function createJobApplication (jobApplication) {
  const data = {
    id: 0,
    advertissement: {
      id: jobApplication.advertisement_id
    },
    person: {
      id: jobApplication.person_id
    },
    email_sent: jobApplication.email_sent,
    status: jobApplication.status
  }
  return axios.post('/api/job_applications', data);
}

/**
 * Updates a job application.
 *
 * @param {object} jobApplication - The job application to be updated.
 * @param {number} jobApplication.advertisement_id - The ID of the advertisement.
 * @param {number} jobApplication.person_id - The ID of the person.
 * @param {boolean} jobApplication.email_sent - Indicates if email was sent.
 * @param {string} jobApplication.status - The status of the application.
 * @return {Promise} A promise that resolves to the updated job application.
 */
function updateJobApplication (jobApplication) {
  const data = {
    id: jobApplication.id,
    advertissement: {
      id: jobApplication.advertisement_id
    },
    person: {
      id: jobApplication.person_id
    },
    email_sent: jobApplication.email_sent,
    status: jobApplication.status
  }
  return axios.put(`/api/job_applications/`, data);
}

/**
 * Deletes a job application with the given ID.
 *
 * @param {number} id - The ID of the job application to delete.
 * @return {Promise} A promise that resolves to the result of the deletion.
 */
function deleteJobApplication(id) {
  return axios.delete(`/api/job_applications/${id}`);
}

const jobApplicationsService = {
  getJobApplications,
  getJobApplicationById,
  getJobApplicationByIdPerson,
  getJobApplicationByIdPoste,
  createJobApplication,
  updateJobApplication,
  deleteJobApplication
};

export default jobApplicationsService;
