import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./logout.css"

import logo from './logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
//import axios from 'axios';

import CreateClass from "./Components/create-class.component";
import StudentList from "./Components/student-list.component";
import ClassList from "./Components/class-list.component";
import EditStudent from "./Components/edit-student.component";
import AddStudent from "./Components/add-student.component";
import Login from "./Components/login.component";
import Signup from "./Components/signup.component";
import ViewForm from "./Components/view-form.component";
import ViewStudent from "./Components/view-student.component";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand" >
                <img src={logo} width="30" height="30" alt="Online Academic Tracker" />
                </span>
                <span className="navbar-brand">Online Academic Tracker</span>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                      <Link to="/view-form" className="nav-link">View Detail</Link>
                    </li>
                </ul>
                </div>
            </nav>
            <br/>

            <Route path="/" exact component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/view/:id" component={ClassList} />
            <Route path="/list/:id" component={StudentList} />
            <Route path="/create/:id" component={CreateClass} />
            <Route path="/edit/:id" component={EditStudent} />
            <Route path="/add/:id" component={AddStudent} />
            <Route path="/view-form" component={ViewForm} />
            <Route path="/view-student/:code" component={ViewStudent} />
          
          </div>
        </Router>
      </div>
    );
  }  
}

export default App;
