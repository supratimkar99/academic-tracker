import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import stupic from '../stupic.png';

export default class CreateClass extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsn = this.onChangeUsn.bind(this);
        this.onChangeMarks = this.onChangeMarks.bind(this);
        this.onChangeAttendance = this.onChangeAttendance.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Usn: '',
            Marks: '',
            Attendance: '',
            className: '',
            classes: '' 
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/classes/getName/'+this.props.match.params.id)
            .then(response => {
                this.setState({className:response.data.ClassName, classes:response.data.Owner}); 
                console.log(this.state.className);
            })
            .catch(function (error){
                console.log(error);
            });
    }

    onChangeName(e) {
        this.setState( {
            Name: e.target.value
        });
    }

    onChangeUsn(e) {
        this.setState({
            Usn: e.target.value
        });
    }

    onChangeMarks(e) {
        this.setState({
            Marks: e.target.value
        });
    }

    onChangeAttendance(e) {
        this.setState({
            Attendance: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Name: ${this.state.Name}`);
        console.log(`USN: ${this.state.Usn}`);
        console.log(`Marks: ${this.state.Marks}`);
        console.log(`Attendance: ${this.state.Attendance}`);

        const newStudent = {
            Name: this.state.Name,
            Usn: this.state.Usn,
            Marks: this.state.Marks,
            Attendance: this.state.Attendance,
            ClassId: this.props.match.params.id
        };

        axios.post('http://localhost:4000/classes/students/'+this.props.match.params.id, newStudent)
            .then(res => {
                console.log(res.data);
                alert("Student Added");
            });
        
        this.setState({
            Name: '',
            Usn: '',
            Marks: '',
            Attendance: ''
        })
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
                <div>
                    <h3>&nbsp;&nbsp;&nbsp;Add New Student</h3>
                    <br />
                    <form onSubmit={this.onSubmit} style={{ width: 700 }}>
                        <div className="form-group"> 
                            <label>Name: </label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.Name}
                                    onChange={this.onChangeName}
                                    />
                        </div>
                        <div className="form-group">
                            <label>USN: </label>
                            <input 
                                    type="text" 
                                    className="form-control"
                                    value={this.state.Usn}
                                    onChange={this.onChangeUsn}
                                    />
                        </div>
                        <div className="form-group">
                            <label>Marks: </label>
                            <input 
                                    type="text" 
                                    className="form-control"
                                    value={this.state.Marks}
                                    onChange={this.onChangeMarks}
                                    />
                        </div>
                        <div className="form-group">
                            <label>Attendance: </label>
                            <input 
                                    type="text" 
                                    className="form-control"
                                    value={this.state.Attendance}
                                    onChange={this.onChangeAttendance}
                                    />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add Student" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}