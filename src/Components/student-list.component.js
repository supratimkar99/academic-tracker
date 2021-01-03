import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import stupic from '../stupic.png';

const Student = props => (
    <tr>
        <td>{props.student.Name}</td>
        <td>{props.student.Usn}</td>
        <td>{props.student.Marks}</td>
        <td>{props.student.Attendance}</td>
        <td>
            <Link to={"/edit/"+props.student._id}>Edit</Link>
        </td>
    </tr>
)

export default class StudentList extends Component {

    constructor(props) {
        super(props);
        this.state = { students: [], className: '', classes: ''};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/classes/students/'+this.props.match.params.id)
            .then(response => {
                this.setState({ students: response.data});
            })
            .catch(function (error){
                console.log(error);
            })

        this.getName();
    }

    studentList() {
        return this.state.students.map(function(currentStudent, i){
            return <Student student={currentStudent} key={i} />;
        });
    }

    getName() {
        axios.get('http://localhost:4000/classes/getName/'+this.props.match.params.id)
            .then(response => {
                this.setState({className:response.data.ClassName, classes:response.data.Owner}); 
                console.log(this.state.className);
            })
            .catch(function (error){
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{height: 50}}>
                        <span class="navbar-brand" target="_blank">
                        <Link to={"/view/"+this.state.classes} className="nav-link"><img src={stupic} width="30" height="30" alt="Students" /></Link>
                        </span>
                        <span className="navbar-brand">{this.state.className}</span>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to={"/list/"+this.props.match.params.id} className="nav-link">Students-List</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to={"/add/"+this.props.match.params.id} className="nav-link">Add-Students</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/login" className="logout">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <br />
                <h3>&nbsp;&nbsp;&nbsp;Students List</h3>
                <table className="table table-striped" style={{ marginTop: 15, width: 900, textAlign: "center" }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>USN</th>
                            <th>Marks</th>
                            <th>Attendance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.studentList() }
                    </tbody>
                </table>
            </div>
        )
    }
}