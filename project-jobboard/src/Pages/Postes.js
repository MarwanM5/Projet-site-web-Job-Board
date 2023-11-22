import { React, useState, useEffect } from 'react';
import AdvertissementService from '../Services/AdvertissementService';
import CompaniesService from '../Services/CompaniesService';
import jobApplicationsService from '../Services/jobApplicationService';
import moment from 'moment';
import Swal from 'sweetalert2';

import '../Styles/Card.css';
import '../Styles/App.css';
import '../Styles/Details.css';
import '../Styles/Form.css';
function Postes () {
    const [poste, setPoste] = useState([]);
    const [posteData, setPosteData] = useState([]);
    const [error, setError] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [jobApplications, setJobApplications] = useState([]);
    const [job_applicationsByPoste, setJob_applicationsByPoste] = useState([]);
    const [job_applicationsByPerson, setJob_applicationsByPerson] = useState([]);

    // Current date for the created_at
    const currentDate = moment().format();

    // Get the user from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // Form data state
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        description: '',
        location: '',
        salary: '',
        category: '',
        company_id: 0,
        created_at: currentDate
    });

    // Form data error state
    const [formDataError, setFormDataError] = useState({
        titleBool: true,
        descriptionBool: true,
        locationBool: true,
        salaryBool: true,
        categoryBool: true,
        company_idBool: true,
        title: '',
        description: '',
        location: '',
        salary: '',
        category: '',
        company_id: 0
    })

    /**
     * Asynchronously retrieves data for a specific post by its ID.
     *
     * @param {type} id - The ID of the post.
     * @return {type} - The data for the post.
     */
    const getDataPostes = async (id) => {
        try {
            const response = await AdvertissementService.getAdvertissementById(id);
            setPosteData(response.data);
            fetchJobApplicationsByPoste(response.data.id);
            toogleDetails();
        } catch (err) {
            setError(err);
        }
    }
    
    /**
     * Fetches data using AdvertissementService.getAdvertissement and updates the state with the response.
     *
     * @return {Promise<void>} - A Promise that resolves when the data is fetched and the state is updated.
     */
    const fetchData = async () => {
        try {
            const response = await AdvertissementService.getAdvertissement();
            setPoste(response.data);
        } catch (err) {
            setError(err);
        }
    };

    /**
     * Fetches the list of companies asynchronously.
     *
     * @return {Promise} The promise that resolves to the list of companies.
     */
    const fetchCompanies = async () => {
        try {
            const response = await CompaniesService.getCompanies();
            setCompanies(response.data);
        } catch (err) {
            setError(err);
        }
    };

    /**
     * Fetches job applications and sets them in the state.
     *
     * @return {Promise<void>} - A Promise that resolves when the job applications are fetched and set in the state.
     */
    const fetchJobApplications = async () => {
        try {
            const response = await jobApplicationsService.getJobApplications();
            setJobApplications(response.data);
        }
        catch (err) {
            setError(err);
        }
    }

    /**
     * Fetches job applications by poste ID and updates the state with the response data.
     *
     * @param {number} id - The ID of the poste.
     * @return {Promise<void>} Promise that resolves when the state is updated.
     */
    const fetchJobApplicationsByPoste = async (id) => {
        try {
            const response = await jobApplicationsService.getJobApplicationByIdPoste(id);
            setJob_applicationsByPoste(response.data);
        }
        catch (err) {
            setError(err);
        }
    }

    /**
     * Fetches job applications by person ID and updates the state with the response data.
     *
     * @param {number} id - The ID of the person.
     * @return {Promise<void>} A promise that resolves with no value.
     */
    const fetchJobApplicationsByPerson = async (id) => {
        try {
            const response = await jobApplicationsService.getJobApplicationByIdPerson(id);
            setJob_applicationsByPerson(response.data);
        }
        catch (err) {
            setError(err);
        }
    }

    useEffect(() => {
        fetchData();
        fetchCompanies();
        fetchJobApplications();
        fetchJobApplicationsByPerson(user.id);
    }, [])

    /**
     * Adds a new post to the list of posts or
     * Updates the state with the response data.
     *
     * @return {Promise<void>} The function does not return any value.
     */
    const addPostes = async () => {
        try {
            if (isUpdating) {
                const data = {
                    id: formData.id,
                    title: formData.title,
                    description: formData.description,
                    location: formData.location,
                    salary: formData.salary,
                    category: formData.category,
                    company: {
                        id: formData.company_id
                    }
                }
                const response = await AdvertissementService.updateAdvertissement(data);
                setPoste([...poste, response.data]);
                setShowForm(false);
                setIsUpdating(false);
                setFormData({
                    id: 0,
                    title: '',
                    description: '',
                    location: '',
                    salary: '',
                    category: '',
                    company_id: 0,
                    created_at: Date.now()
                })
                setShowDetails(false);
                fetchData();
            }
            else {
                const data = {
                    id: formData.id,
                    title: formData.title,
                    description: formData.description,
                    location: formData.location,
                    salary: formData.salary,
                    category: formData.category,
                    company: {
                        id: formData.company_id
                    }
                }
                const response = await AdvertissementService.createAdvertissement(data);
                setPoste([...poste, response.data]);
                setShowForm(false);
                setFormData({
                    title: '',
                    description: '',
                    location: '',
                    salary: '',
                    category: '',
                    company_id: 0,
                    created_at: Date.now()
                })
                fetchData();
            }
        } catch (err) {
            setError(err);
        }
    }

    /**
     * Handles the form submission asynchronously.
     *
     * @param {Event} e - The form submission event.
     * @return {Promise<void>} A promise that resolves when the form submission is complete.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formDataError.titleBool || formDataError.descriptionBool || formDataError.locationBool || formDataError.salaryBool || formDataError.categoryBool || formDataError.company_idBool) {
            console.error("Please fill in all the fields correctly!");
            return;
        }
        await addPostes();
    }

    /**
     * Updates the status of a given data object.
     *
     * @param {object} data - The data object to update.
     * @param {string} value - The new status value.
     * @return {Promise<void>} - A promise that resolves when the update is complete.
     */
    const changeStatus = async (data, value) => {
        const dataUpdate = {
            id: data.id,
            status: value,
            email_sent: data.email_sent,
            advertissement: {
                id: data.advertissement.id
            },
            person: {
                id: data.person.id
            }
        }
        await jobApplicationsService.updateJobApplication(dataUpdate);
        fetchJobApplications();
        setShowDetails(false);
    }

    /**
     * Shows the update form and sets the form data and form data error.
     *
     * @param {Object} data - The data object containing the updated values.
     */
    const showUpdateForm = (data) => {
        setShowForm(true);
        setIsUpdating(true);
        setFormData({
            id: data.id,
            title: data.title,
            description: data.description,
            location: data.location,
            salary: data.salary,
            category: data.category,
            company_id: data.company.id,
            created_at: data.created_at
        })
        setFormDataError({
            titleBool: false,
            descriptionBool: false,
            locationBool: false,
            salaryBool: false,
            categoryBool: false,
            company_idBool: false,
            title: '',
            description: '',
            location: '',
            salary: '',
            category: '',
            company_id: 0
        })
    }

    /**
     * Deletes a post and confirms the deletion with a modal dialog.
     *
     * @param {Object} data - The data of the post to be deleted.
     * @return {Promise} A promise that resolves with the result of the deletion.
     */
    const deletePoste = async (data) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await AdvertissementService.deleteAdvertissement(data.id);
                    setShowDetails(false);
                    setPoste(poste.filter((p) => p.id !== response.data.id));
                    fetchData();
                } catch (err) {
                    setError(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                    });
                }
            }
        });
    }

    /**
     * Toggles the details of something.
     *
     * @return {void} - No return value
     */
    const toogleDetails = () => {
        setShowDetails(!showDetails);
    }

    /**
     * Handles the click event on a button.
     *
     * @param {Event} event - The click event.
     * @param {string} postId - The ID of the post.
     */
    function handleButtonClick (event, postId) {
        const cardElement = event.currentTarget.closest('.card');
        cardElement.classList.add('card-active');
        getDataPostes(postId);
    }

    /**
     * Handles the input change event.
     *
     * @param {Event} event - The input change event.
     * @return {void}
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (value.trim() === "" || value === "0") {
            setFormDataError(prevError => ({
                ...prevError,
                [`${name}Bool`]: true,
                [name]: `${name} cannot be empty or default!`
            }));
        } else {
            setFormDataError(prevError => ({
                ...prevError,
                [`${name}Bool`]: false,
                [name]: ''
            }));
        }
    }

    // If there is an error while fetching the data from the API, show the error message
    if (error) {
        return <div className='error'>Error : {error.message}</div>;
    }

    /**
     * Apply for the position.
     *
     * @param {Object} poste - The position object.
     */
    const applyPosition = async (poste) => {
        //apply for the position : jobApplicationService.createJobApplication(jobApplication);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, apply for the position!'
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const data = {
                        id: 0,
                        advertisement_id: poste.id,
                        person_id: user.id,
                        email_sent: true,
                        status: 'pending'
                    }
                    await jobApplicationsService.createJobApplication(data);
                }
                else {
                    return;
                }
            })
    }

    return (
        <div>
            <h3 className='page-title'>Postes</h3>
            {user.role === 'admin' && <button className='btn btn-create' onClick={() => setShowForm(true)}>Add Poste</button>}
            <div className='container-details' id='top'>
                {showDetails && posteData && (
                    <div className='details-poste card'>
                        <p className='card-title'>{posteData.title}</p>
                        <div className='card-content'>
                            <p className='company-name'>{posteData.company.name}</p>
                            <p >Location :{posteData.location}</p>
                            <p>Description: {posteData.description}</p>
                            <p>Salary: {posteData.salary} €</p>
                            <p>Creation Date: {moment(posteData.created_at).format('DD/MM/YYYY')}</p>
                            {
                                (user.role === 'admin' || ((user.role === 'manager' && posteData.company.id === user.company.id) && (job_applicationsByPerson.length !== 0 || job_applicationsByPoste.length !== 0))) && (
                                    <div>
                                        {job_applicationsByPoste.map((jobApplication) => (
                                            <div>
                                                {(jobApplication.person.id === user.id && jobApplication.advertissement.id === posteData.id) ? (
                                                    <div>
                                                        <ul>
                                                            <li>{jobApplication.person.name} | {jobApplication.status}</li>
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <p>No persons registered in the position</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                        <div className='btn-container card-footer'>
                            <button className='btn btn-close' onClick={() => {
                                setShowDetails(false);
                                const cardElement = document.querySelector('.card-active');
                                if (cardElement) {
                                    cardElement.classList.remove('card-active');
                                }
                            }}>Close Details</button>
                            {(user.role === 'admin' || (user.role === 'manager' && posteData.company.id === user.company.id)) && <div>
                                <button className='btn' onClick={() => showUpdateForm(posteData)}>Edit Poste</button>
                                <button className='btn btn-delete' onClick={() => deletePoste(posteData)}>Delete Poste</button>
                            </div>
                            }
                            {jobApplications.map((jobApplication) => (
                                <div>
                                    {jobApplication.person.id !== user.id && (
                                        <div>
                                            {(user.company.id === posteData.company.id) && <div>
                                                <button className='btn' onClick={() => applyPosition(posteData)} >Apply for the position</button>
                                            </div>}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='cards-container'>
                {poste && poste.length > 0 ? poste.map((p) => (
                    <div className='card' key={p.id}>
                        <p className='card-title'>{p.title}</p>
                        <p className='card-content company-name'>{p.company.name}</p>
                        <p className='card-content'>{p.location}</p>
                        {!showDetails && (
                            <p className='card-footer'>
                                <button className='btn' onClick={(event) => handleButtonClick(event, p.id)}>Learn More</button>
                            </p>
                        )}
                        <button className='card-footer btn'><a href='#top'>Go to top</a></button>
                    </div>
                )) : <div className='error'>NO DATA IN DATABASE FOR POSTES</div>}
            </div>
            <br />
            {showForm && (
                <div className='container-form'>
                    <form className='form' onSubmit={handleSubmit}>
                        <input type="hidden" name="id" id='id' value={formData.id} />
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            id='title'
                            onChange={handleInputChange}
                        />
                        {formDataError.titleBool && <span className="error-message">{formDataError.title}</span>}
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            className='textarea'
                            id='description'
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        {formDataError.descriptionBool && <span className="error-message">{formDataError.description}</span>}
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            name="location"
                            id='location'
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                        {formDataError.locationBool && <span className="error-message">{formDataError.location}</span>}
                        <label htmlFor="salary">Salary:</label>
                        <input type='number'
                            name='salary'
                            id='salary'
                            value={formData.salary}
                            onChange={handleInputChange} />
                        {formDataError.salaryBool && <span className="error-message">{formDataError.salary}</span>}
                        <label htmlFor="category">Category:</label>
                        <input type='text'
                            name='category'
                            id='category'
                            value={formData.category}
                            onChange={handleInputChange} />
                        {formDataError.categoryBool && <span className="error-message">{formDataError.category}</span>}
                        <label htmlFor='company_id'>Company:</label>
                        <select
                            name='company_id'
                            id='company_id'
                            value={formData.company_id}
                            onChange={handleInputChange}>
                            <option value="0">Select Company</option>
                            {companies && companies.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        {formDataError.company_idBool && <span className="error-message">{formDataError.company}</span>}
                        <button className='btn' type="submit">{isUpdating ? 'Update Poste' : 'Create Poste'}</button>
                        <br />
                        <button className='btn' onClick={() => setShowForm(false)}>Close Form</button>
                    </form>
                </div>
            )
            }
        </div>
    );
}

export default Postes;