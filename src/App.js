import React from 'react';
import './App.css';
import Header from './components/Header'
import SelectDistrict from './components/SelectDistrict';
import Footer from './components/Footer'


function App() {
  return (
    <div className="main">
        <Header/>
        <SelectDistrict/>
        <Footer/>
    </div>
  );
}

export default App;
