import React from 'react'
import { Routes, Route } from 'react-router-dom'


import Home from './components/Home';
import Contact from './components/Contact';
import Header from './components/Header';
import Registretion from './components/Registretion';
import Login from './components/Login';
import Logout from './components/Logout';



function App() {
  return (
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/registretion" element={<Registretion />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<h1> Error Page</h1>} />
            </Route>
          </Routes>
  );
}

export default App;


