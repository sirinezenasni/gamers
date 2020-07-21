import React from 'react';
import LoginPage from './LoginPage.js';
import RegisterPage from './RegisterPage.js';
import Footer from './Footer';

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