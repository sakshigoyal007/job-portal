import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@material-ui/core";
import Ap2 from "./Ap2";
import HomePage from "./pages/HomePage";
import RecruiterDashboard from "./pages/RecruiterDashboard";
// import Button from '@material-ui/core/Button';


function App(){

    return (
        <div>
            {/*<p>
              Add and edit<code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>hey 1234 button</Button> 
               </a> */}
              <BrowserRouter>
              <Routes>
                <Route path="/" exact element={<HomePage/>}/>
                <Route path="/Ap2" exact element={<Ap2/>}/>
                <Route path="/recruiters" exact element={<RecruiterDashboard/>}/>
                </Routes>
              </BrowserRouter>
           
        </div>
      );
}

export default App;