import { React, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleService from '../Services/PeopleService';
import CompaniesService from '../Services/CompaniesService';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../Components/AuthContext';
import alert from 'sweetalert2';

import '../Styles/Form.css';
import '../Styles/Account.css';
import Swal from 'sweetalert2';

function Account () {
    const navigation = useNavigate();
    const [isExisting, setIsExisting] = useState(false);
    const [person, setPerson] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [verifyEmailClicked, setVerifyEmailClicked] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [showformUpdate, setShowformUpdate] = useState(false);
    const [showFormChangePassword, setShowFormChangePassword] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("userToken");
    const inputMail = useRef();


    // Auth context
    const { loginC, logoutC } = useAuth();

    // Get user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // Form data state
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        email: '',
        password: '',
        company_id: 0,
        role: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    // Form data error state
    const [formDataError, setFormDataError] = useState({
        nameBool: true,
        name: '',
        emailBool: true,
        email: '',
        passwordBool: true,
        password: '',
        company_idBool: true,
        company_id: '',
        roleBool: true,
        role: '',
        currentPasswordBool: true,
        currentPassword: '',
        newPasswordBool: true,
        newPassword: '',
        confirmPasswordBool: true,
        confirmPassword: ''
    })

    /**
     * Retrieves all persons from the PeopleService API and sets the person state with the response data.
     *
     * @return {Promise<void>} - A Promise that resolves once the operation is complete.
     */
    const getAllPersons = async () => {
        try {
            const response = await PeopleService.getPeople();
            setPerson(response.data);
        } catch (err) {
            setError(err);
        }
    }

    /**
     * Fetches companies from the CompaniesService and updates the state with the response.
     *
     * @return {Promise<void>} - A promise that resolves when the fetch is complete.
     */
    const fetchCompanies = async () => {
        try {
            const response = await CompaniesService.getCompanies();
            setCompanies(response.data);
        } catch (err) {
            setError(err);
        }
    }

    /**
     * Resets the password for a user.
     *
     * @return {Promise<void>} - A Promise that resolves when the password is reset successfully.
     */
    const resetPassword = async () => {
        try {
            await PeopleService.resetPassword(formData.email, formData.password);
            Swal.fire({
                icon: 'success',
                title: 'Password changed successfully',
                showConfirmButton: false,
                timer: 1500
            })
            setIsResetPassword(false);
            setIsExisting(false);
            setFormData({
                id: 0,
                name: '',
                email: '',
                password: '',
                company_id: 0,
                role: ''
            })
        } catch (err) {
            setError(err);
        }
    }

    /**
     * Resets the password for a logged-in user.
     *
     * @return {Promise<void>} - A Promise that resolves when the password is reset successfully.
     */
    const resetPasswordLoggedIn = async () => {
        try {
            const verifyPassword = await PeopleService.verifyPassword(user.email, formData.currentPassword);
            if (!verifyPassword) {
                setFormDataError(prevError => ({
                    ...prevError,
                    currentPasswordBool: true,
                    currentPassword: 'Wrong password'
                }))
                return;
            }
            if (formData.newPassword !== formData.confirmPassword) {
                setFormDataError(prevError => ({
                    ...prevError,
                    confirmPasswordBool: true,
                    confirmPassword: 'Passwords do not match'
                }));
            }
            else {
                await PeopleService.resetPassword(user.email, formData.password);
                Swal.fire({
                    icon: 'success',
                    title: 'Password changed successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsResetPassword(false);
                setIsExisting(false);
                setFormData({
                    id: 0,
                    name: '',
                    email: '',
                    password: '',
                    company_id: 0,
                    role: '',
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
            }
        } catch (err) {
            setError(err);
        }
    }

    /**
     * Logs in the user by sending a login request to the PeopleService API. 
     * If successful, stores the user token and user data in the local storage.
     * Finally, navigates to the home page and calls the loginC function.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    const login = async () => {
        try {
            const response = await PeopleService.login(formData.email, formData.password);
            const token = response.data.token;
            localStorage.setItem('userToken', token);

            const email = jwtDecode(token).sub;
            const userResponse = await PeopleService.getPersonByEmail(email);

            localStorage.setItem('user', JSON.stringify(userResponse.data));

            navigation('/');
            loginC();

        } catch (error) {
            setError(error);
        }
    }

    /**
     * Updates a person.
     *
     * @param {Object} person - The person object to be updated.
     * @return {Promise} A promise that resolves with the updated user data.
     */
    const updatePerson = async (person) => {
        try {
            if (isExisting) {
                const data = {
                    id: formData.id,
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role,
                    company: {
                        id: formData.company_id
                    }
                }
                const response = await PeopleService.updatePerson(data);
                user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
            }
        } catch (err) {
            setError(err);
        }
    }

    /**
     * Creates an account asynchronously.
     *
     * @return {void}
     */
    const createAccount = async () => {
        try {
            if (isResetPassword) {
                await resetPassword();
            }
            if (!isExisting) {
                if (!formDataError.nameBool || !formDataError.emailBool || !formDataError.passwordBool || !formDataError.roleBool || !formDataError.company_idBool) {
                    const data = {
                        id: 0,
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        role: formData.role,
                        company: {
                            id: formData.company_id
                        }
                    }
                    const response = await PeopleService.createPerson(data);
                    setPerson([...person, response.data]);
                    setIsExisting(true);
                    login();
                    setFormData({
                        id: 0,
                        name: '',
                        email: '',
                        password: '',
                        company_id: 0
                    })
                }
            }
            else {
                login();
            }
        } catch (err) {
            setError(err);
        }
    }

    /**
     * Verifies the password for the user.
     *
     * @param {string} email - The email of the user.
     * @param {string} currentPassword - The current password to be verified.
     * @return {Promise<boolean>} - A promise that resolves to true if the password is verified, false otherwise.
     */
    const verifyPassword = async () => {
        try {
            const response = await PeopleService.verifyPassword(user.email, formData.currentPassword);
            return response;
        } catch (err) {
            setError(err);
            return false;
        }
    }

    /**
     * Handles the input change event.
     *
     * @param {Event} event - The input change event.
     * @return {Promise<void>} - A promise that resolves when the input change is handled.
     */
    const handleInputChange = async (event) => {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        if (value.trim() === "" || value === "0") {
            setFormDataError(prevError => ({
                ...prevError,
                [`${name}Bool`]: true,
                [name]: `${name} cannot be empty`
            }));
        } else if (person.find((p) => p.email === value)) {
            setFormDataError(prevError => ({
                ...prevError,
                [`${name}Bool`]: true,
                [name]: `${name} already exists`
            }));
        } else {
            setFormDataError(prevError => ({
                ...prevError,
                [`${name}Bool`]: false,
                [name]: ''
            }));
        }
    }

    /**
     * Handles the form submission.
     *
     * @param {Event} e - The form submission event.
     * @return {Promise} A promise that resolves when the account is created.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createAccount();
    }

    /**
     * Sets the showFormUpdate state to true and updates the formData and formDataError states.
     *
     * @param {Object} data - The data object containing the values to be updated.
     */
    const showUpdateForm = (data) => {
        setShowformUpdate(true);
        setFormData({
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            company_id: data.company.id
        });
        setFormDataError({
            nameBool: false,
            emailBool: false,
            passwordBool: false,
            roleBool: false,
            company_idBool: false,
            name: '',
            email: '',
            password: '',
            role: '',
            company_id: 0
        })
    }

    /**
     * Verify an email address using the PeopleService API.
     *
     * @param {Event} e - The event object.
     * @return {Promise<void>} Promise that resolves to nothing.
     */
    const verifyEmail = async (e) => {
        e.target.disabled = true;
        e.target.style.display = 'none';
        setVerifyEmailClicked(true);
        inputMail.current.disabled = true;
        if (person.find((p) => p.email === formData.email)) {
            setIsExisting(true);
        }
        else {
            setIsExisting(false);
        }
    }

    useEffect(() => {
        getAllPersons();
        fetchCompanies();
    }, [])

    return (
        <div>
            <div>
                {!token ? (
                    <div className='form-account'>
                        <form className='form' onSubmit={handleSubmit}>
                            <label htmlFor='email'>Email</label>
                            <input ref={inputMail} type='email' name='email' value={formData.email} onChange={handleInputChange} />
                            <span className='error-account'>{formDataError.emailBool ? formDataError.email : ''}</span>
                            <button className='btn' onClick={verifyEmail}>Login/Register</button>
                            {verifyEmailClicked && (
                                <div>
                                    {!isExisting && !isResetPassword ? (
                                        <div>
                                            <label htmlFor='name'>Name: </label>
                                            <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
                                            <br />
                                            <span className='error-account'>{formDataError.nameBool ? formDataError.name : ''}</span>
                                            <br />
                                            <label htmlFor='password'>Password: </label>
                                            <input type='password' name='password' value={formData.password} onChange={handleInputChange} />
                                            <br />
                                            <span className='error-account'>{formDataError.passwordBool ? formDataError.password : ''}</span>
                                            <br />
                                            <label htmlFor='company_id'>Company: </label>
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
                                            <br />
                                            <span className='error-account'>{formDataError.company_idBool ? formDataError.company_id : ''}</span>
                                            <br />
                                            <label htmlFor='role'>Role: </label>
                                            <select name='role' id='role'
                                                value={formData.role} onChange={handleInputChange}>
                                                <option value="0">Select Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="manager">Manager</option>
                                                <option value="employee">Employee</option>
                                            </select>
                                            <br />
                                            <span className='error-account'>{formDataError.roleBool ? formDataError.role : ''}</span>
                                            <br />
                                            <button className='btn' type='submit'>Create</button>
                                        </div>
                                    ) : <div>
                                        {!isResetPassword && <div>
                                            <label htmlFor='password'>Password</label>
                                            <input type='password' name='password' value={formData.password} onChange={handleInputChange} />
                                            <br />
                                            <span className='error'>{error && error.message == "Error message with a status code 401" ? "Wrong password" : ''}</span>
                                            <br />
                                            <button className='btn' type='submit'>Login</button>
                                            <button className='btn' type='button' onClick={() => { setIsResetPassword(true); setIsExisting(false); }}>Reset Password</button>
                                        </div>}
                                        {isResetPassword && <div>
                                            <label htmlFor='password'>Reset Password: </label>
                                            <input type='password' name='password' value={formData.password} onChange={handleInputChange} />
                                            <br />
                                            <button className='btn' type='submit'>Reset Password</button>
                                            <br />
                                        </div>
                                        }
                                    </div>}
                                </div>
                            )}
                        </form>
                    </div>
                ) : (
                    <div>
                        <div className='account-container'>
                            {user && (
                                <div className='card'>
                                    <h2 className='card-title'>Data for User</h2>
                                    <div className='card-content'>
                                        <p>Name: {user.name}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Role: {user.role}</p>
                                        <p>Company: {user.company.name}</p>
                                    </div>
                                    <div className='card-footer'>
                                        <button className='btn' onClick={() => showUpdateForm(user)}>Update</button>
                                        <button className='btn' onClick={() => setShowFormChangePassword(true)}>Change Password</button>
                                    </div>
                                </div>
                            )}
                            {showformUpdate && (
                                <div className='container-form'>
                                    <form className='form' onSubmit={updatePerson}>
                                        <input type='hidden' name='id' value={user.id} />
                                        <label htmlFor='name'>Name: </label>
                                        <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
                                        <br />
                                        <span className='error-account'>{formDataError.nameBool ? formDataError.name : ''}</span>
                                        <label htmlFor='email'>Email: </label>
                                        <input type='email' name='email' value={formData.email} onChange={handleInputChange} />
                                        <br />
                                        <span className='error-account'>{formDataError.emailBool ? formDataError.email : ''}</span>
                                        <br />
                                        <label htmlFor='company_id'>Company: </label>
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
                                        <br />
                                        <span className='error-account'>{formDataError.company_idBool ? formDataError.company_id : ''}</span>
                                        <br />
                                        {!formDataError.nameBool && !formDataError.emailBool && !formDataError.company_idBool && !formDataError.passwordBool && !formDataError.roleBool &&
                                            <button className='btn' type='submit'>Update</button>
                                        }
                                        <br />
                                        <button className='btn' onClick={() => setShowformUpdate(false)}>Close Form</button>
                                    </form>
                                </div>
                            )}
                            {showFormChangePassword && (
                                <div className='container-form'>
                                    {/*Form contains currentPassword and verifyPassword/ newPassword and confirmPassword.*/}
                                    <form className='form' onSubmit={resetPasswordLoggedIn}>
                                        <label htmlFor='currentPassword'>Current Password: </label>
                                        <input type='password' name='currentPassword' value={formData.currentPassword} onChange={handleInputChange} />
                                        <br />
                                        <span className='error-account'>{formDataError.currentPasswordBool ? formDataError.currentPassword : ''}</span>
                                        <br />
                                        <div>
                                            <label htmlFor='newPassword'>New Password: </label>
                                            <input type='password' name='newPassword' value={formData.newPassword} onChange={handleInputChange} />
                                            <br />
                                            <span className='error-account'>{formDataError.newPasswordBool ? formDataError.newPassword : ''}</span>
                                            <br />
                                            <label htmlFor='confirmPassword'>Confirm Password: </label>
                                            <input type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange} />
                                            <br />
                                            <span className='error-account'>{formDataError.confirmPasswordBool ? formDataError.confirmPassword : ''}</span>
                                            <br />
                                            <button className='btn' type='submit'>Change Password</button>
                                            <br />
                                        </div>
                                        <button className='btn' onClick={() => setShowFormChangePassword(false)}>Close Form</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

export default Account;