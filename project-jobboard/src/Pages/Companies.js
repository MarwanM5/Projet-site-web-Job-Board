import { React, useState, useEffect } from 'react';
import CompaniesService from '../Services/CompaniesService';
import '../Styles/Card.css';
import '../Styles/App.css';
import '../Styles/Details.css';
import '../Styles/Form.css';
import Swal from 'sweetalert2';
function Companies () {
    const [company, setCompany] = useState([]);
    const [error, setError] = useState(null);
    const [companyData, setCompanyData] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Auth context
    const user = JSON.parse(localStorage.getItem('user'));

    // Form data state
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        contact_email: '',
        address: ''
    });

    // Form data error state
    const [formDataError, setFormDataError] = useState({
        nameBool: true,
        contact_emailBool: true,
        addressBool: true,
        name: '',
        contact_email: '',
        address: ''
    });

    /**
     * Retrieves data for companies based on the provided ID.
     *
     * @param {number} id - The ID of the company.
     * @return {Promise<void>} - A promise that resolves once the data is retrieved.
     */
    const getDataCompanises = async (id) => {
        try {
            const response = await CompaniesService.getCompanyById(id);
            setCompanyData(response.data);
            setShowDetails(true);
        } catch (err) {
            setError(err);
        }
    }

    /**
     * Add a new company to the database.
     *
     * @return {Promise<void>} - A promise that resolves when the company is added successfully.
     * @throws {Error} - If there is an error adding the company to the database.
     */
    const addCompany = async () => {
        try {
            if (isUpdating) {
                const data = {
                    id: formData.id,
                    name: formData.name,
                    contact_email: formData.contact_email,
                    address: formData.address
                }
                const response = await CompaniesService.updateCompany(data);
                setCompany([...company, response.data]);
                setShowForm(false);
                setIsUpdating(false);
                setFormData({
                    name: '',
                    contact_email: '',
                    address: ''
                })
                setShowDetails(false);
                fetchData();
            }
            else {
                const response = await CompaniesService.createCompany(formData);
                setCompany([...company, response.data]);
                setShowForm(false);
                setFormData({
                    name: '',
                    contact_email: '',
                    address: ''
                })
                fetchData();
            }
        } catch (err) {
            setError(err);
        }
    };


    /**
     * Handles the form submission asynchronously.
     *
     * @param {Event} e - The event object representing the form submission.
     * @return {Promise<void>} A promise that resolves when the form submission is handled.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUpdating) {
            setFormDataError({
                nameBool: false,
                contact_emailBool: false,
                addressBool: false,
                name: '',
                contact_email: '',
                address: ''
            })
        }

        if (formDataError.nameBool || formDataError.contact_emailBool || formDataError.addressBool) {
            console.error("Please fill in all the fields correctly!");
            return;
        }

        await addCompany();
    };

    /**
     * Handles the input change event.
     *
     * @param {Object} event - The input change event.
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));

        if (value.trim() === "") {
            setFormDataError(prevError => ({
                ...prevError,
                [`${name}Bool`]: true,
                [name]: `${name} cannot be empty!`
            }));
        } else {
            setFormDataError(prevError => ({
                ...prevError,
                [`${name}Bool`]: false,
                [name]: ''
            }));
        }
    };

    /**
     * Updates the form data and shows the update form.
     *
     * @param {Object} data - The data object containing the updated values.
     */
    const showUpdateForm = (data) => {
        setShowForm(true);
        setIsUpdating(true);
        setFormData({
            id: data.id,
            name: data.name,
            contact_email: data.contact_email,
            address: data.address
        });
        setFormDataError({
            nameBool: false,
            contact_emailBool: false,
            addressBool: false,
            name: '',
            contact_email: '',
            address: ''
        })
    }

    /**
     * Deletes a company from the database.
     *
     * @param {Object} data - The data required to delete the company.
     * @return {Promise} A promise that resolves when the company is deleted successfully.
     */
    const deleteCompany = async (data) => {
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
                    const response = await CompaniesService.deleteCompany(data.id);
                    setShowDetails(false);
                    setCompany(company.filter((c) => c.id !== response.data.id));
                    fetchData();
                } catch (err) {
                    setError(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                }
            }
        });
    }

    /**
     * Fetches data from the CompaniesService and updates the state with the response.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    const fetchData = async () => {
        try {
            const response = await CompaniesService.getCompanies();
            setCompany(response.data);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // if there is an error fetching the data, show an error message
    if (error) {
        return <div className='error'>Error : {error.message}</div>;
    }

    return (
        <div>
            <h3 className='page-title'>Companies</h3>
            <button className='btn btn-create' onClick={() => setShowForm(true)}>Add Company</button>
            <div className='cards-container'>
                {company && company.length > 0 ? company.map((c) => (
                    <div className='card' key={c.id}>
                        <p className='card-title'>{c.name}</p>
                        <p className='card-content'>{c.contact_email}</p>
                        <p className='card-footer'><button className='btn' onClick={() => getDataCompanises(c.id)}>Learn More</button></p>
                    </div>
                )) : <div className='error'>NO DATA IN DATABASE FOR COMPANIES</div>}
            </div>

            <br />
            {showDetails && companyData && (
                <div className='container'>
                    <div className='details' id='modal'>
                        <h3>{companyData.name} Details</h3>
                        <p>Address: {companyData.address}</p>
                        <p>Email: {companyData.contact_email}</p>
                        <div className='btn-container'>
                            <button className='btn btn-close' onClick={() => {
                                document.getElementById('modal').classList.add('details-close');
                                document.getElementById('modal').addEventListener('animationend', () => {
                                    setShowDetails(false);
                                });
                            }}>Close Details</button>
                            {(user.role === 'admin' || (user.role === 'manager' && user.id === companyData.id)) && <div>
                                <button className='btn' onClick={() => showUpdateForm(companyData)}>Edit Company</button>
                                <button className='btn btn-delete' onClick={() => deleteCompany(companyData)}>Delete Company</button>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            )}
            {showForm && (
                <div className='container-form'>
                    <form className='form' onSubmit={handleSubmit}>
                        <input type='hidden' name='id' id='id' value={formData.id} />
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' id='name' value={formData.name} onChange={handleInputChange} />
                        <span className="error-message">{formDataError.name}</span>

                        <label htmlFor='address'>Address</label>
                        <textarea type='text' className='textarea' name='address' id='address' value={formData.address} onChange={handleInputChange} />
                        <span className="error-message">{formDataError.address}</span>

                        <label htmlFor='contact_email'>Contact Email</label>
                        <input type='text' name='contact_email' id='contact_email' value={formData.contact_email} onChange={handleInputChange} />
                        <span className="error-message">{formDataError.contact_email}</span>

                        <button className='btn' type="submit">{isUpdating ? 'Update Company' : 'Create Company'}</button>
                        <br />
                        <button className='btn' onClick={() => setShowForm(false)}>Close Form</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Companies;