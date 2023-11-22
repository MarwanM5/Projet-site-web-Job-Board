import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Navigation.css';
import RoutesService from '../Services/RoutesService';
import { useAuth } from '../Components/AuthContext';

function Navigation () {
    const { logoutC } = useAuth();
    const navigation = useNavigate();
    const [isConnected, setIsConnected] = useState(false);

    const token = localStorage.getItem('userToken');

    /**
     * Toggles the connected state based on the presence of a token.
     */
    const toogleConnected = () => {
        if (token) {
            setIsConnected(true);
        }
    }

    useEffect(() => {
        toogleConnected();
    })

    /**
     * Logout the user by removing the user token and user data from local storage,
     * navigating to the '/account' page, and updating the state to indicate that the
     * user is no longer connected.
     */
    const logout = async () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        navigation('/account');
        logoutC();
        setIsConnected(false);
    }
    return (
        <nav className="nav">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/account">Account</NavLink></li>
                {isConnected && <li><NavLink to="/postes">Postes</NavLink></li> }
                {isConnected && <li><NavLink to="/company">Companies</NavLink></li>}
            </ul>
            {isConnected && <button className='btn' onClick={logout}>Logout</button>}
        </nav>
    );
}

export default Navigation;