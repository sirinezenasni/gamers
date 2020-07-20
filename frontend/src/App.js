import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './LoginPage.js';
import RegisterPage from './RegisterPage.js';
import Footer from './Footer'

function App() {
  return (
    <div>
      <LoginPage />
      <RegisterPage />
      <Footer />
    </div>
  );
}

export default App;
