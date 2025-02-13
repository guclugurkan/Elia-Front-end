import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
function App() {
 return(
  <Router>
  <Routes>
    <Route path='/' element= {<Signup/>}/>
    <Route path='/login' element = {<Login/>} /> 
    <Route path='/dashboard' element = {<Dashboard/>} />
  </Routes>
 </Router>
 )

}

export default App


