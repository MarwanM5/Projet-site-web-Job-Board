import axios from 'axios';

/**
 * Retrieves all routes from the API.
 *
 * @return {Promise} A promise that resolves to the response from the API.
 */
function getAllRoutes() {
    return axios.get('http://localhost:8080/api/routes');
}

const RoutesService = {
    getAllRoutes
}

export default RoutesService;