import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import clapic from '../clapic.png'

const Class = props => (
    <tr>
        <td>{props.class.ClassName}</td>
        <td>{props.class.ClassCode}</td>
        
        <td>
            <Link to={"/list/"+props.class._id}>View</Link>
        </td>
    </tr>
)

export default class ClassList extends Component {

    constructor(props) {
        super(props);
        this.state = { classes: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/classes/'+this.props.match.params.id)
            .then(response => {
                this.setState({ classes: response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    classList() {
        return this.state.classes.map(function(currentClass, i){
            return <Class class={currentClass} key={i} />;
        });
    }

    render() {
        return (
            <div>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <span class="navbar-brand">
                            <img src={clapic} width="30" height="30" alt="Online Academic Tracker" />
                            </span>
                            <span className="navbar-brand">Classes</span>
                            <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                <Link to={"/view/"+this.props.match.params.id} className="nav-link">View-Classes</Link>
                                </li>
                                <li className="navbar-item">
                                <Link to={"/create/"+this.props.match.params.id} className="nav-link">Create-Classes</Link>
                                </li>
                                <li className="navbar-item">
                                <Link to="/login" className="logout">Logout</Link>
                                </li>
                            </ul>
                            </div>
                        </nav>
                        <br/>
                    
                    </div>
                <h3>&nbsp;&nbsp;&nbsp;Class List</h3>
                <table className="table table-striped" style={{ marginTop: 15, width: 600, textAlign: "center" }} >
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Class Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.classList() }
                    </tbody>
                </table>
            </div>
        )
    }
}