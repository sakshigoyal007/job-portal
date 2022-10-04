import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecruiterDashboard from "./pages/RecruiterDashboard";


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