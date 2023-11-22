import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './Pages/Home';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Account from './Pages/Account';
import Postes from './Pages/Postes';
import Company from './Pages/Companies';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <BrowserRouter>
                <Navigation />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/postes" element={<Postes />} />
                  <Route path="/company" element={<Company />} />
                  <Route path="/account" element={<Account />} />
                </Routes>
                <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
