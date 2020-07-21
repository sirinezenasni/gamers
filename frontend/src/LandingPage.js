import React, { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppContext from './AppContext.js';
import LoginPage from './LoginPage.js';
import RegisterPage from './RegisterPage.js';
import Footer from './Footer';
import NavBar from './NavBar';

function LandingPage() {
    return (
    <div>
        <LoginPage />
        <RegisterPage />
        <Footer />
    </div>
  );
}

export default LandingPage;