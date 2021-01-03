import React, { Component } from 'react';
import axios from 'axios';

export default class EditStudent extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUSN = this.onChangeUSN.bind(this);
        this.onChangeMarks = this.onChangeMarks.bind(this);
        this.onChangeAttendance = this.onChangeAttendance.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPress = this.onPress.bind(this);

        this.state = {
            Name: '',
            Usn: '',
            Marks: 0,
            Attendance: 0,
            ClassId: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/classes/students/one/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    Name: response.data.Name,
                    Usn: response.data.Usn,
                    Marks: response.data.Marks,
                    Attendance: response.data.Attendance,
                    ClassId: response.data.ClassId
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        });
    }

    onChangeUSN(e) {
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
        const obj = {
            Name: this.state.Name,
            Usn: this.state.Usn,
            Marks: this.state.Marks,
            Attendance: this.state.Attendance,
            ClassId: this.state.ClassId
        };
        //console.log(obj);
        axios.post('http://localhost:4000/classes/students/update/'+this.props.match.params.id, obj)
            .then(res => {
                console.log(res.data);
                alert("Student Updated");
            });
        this.props.history.push("/list/"+this.state.ClassId);
        //console.log(this.state.ClassId);
    }
    
    onPress(e) {
        e.preventDefault();
        axios.delete('http://localhost:4000/classes/students/delete/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                alert("Student Deleted");
            });
        this.props.history.push("/list/"+this.state.ClassId);
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Student</h3>
                <form onSubmit={this.onSubmit}>
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
                                onChange={this.onChangeUSN}
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

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Student" className="btn btn-primary" />
                    </div>

                    <br />

                </form>
                <form onSubmit={this.onPress}>
                <div className="form-group">
                        <input type="submit" value="Delete Student" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}