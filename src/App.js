import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@material-ui/core";
import HomePage from "./pages/HomePage";
import RecruiterDashboard from "./pages/RecruiterDashboard";
// import Button from '@material-ui/core/Button';


function App(){

    return (
        <div>
              <BrowserRouter>
              <Routes>
                <Route path="/" exact element={<HomePage/>}/>
                <Route path="/recruiters" exact element={<RecruiterDashboard/>}/>
                </Routes>
              </BrowserRouter>
           
        </div>
      );
}

export default App;