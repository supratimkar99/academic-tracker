import React, { Component } from 'react';
import axios from 'axios';

export default class ViewStudent extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            Name: '',
            Usn: '',
            Marks: '',
            Attendance: '',
            ClassName: ''
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/classes/students/view/'+this.props.match.params.code)
            .then(response => {
                this.setState({Name : response.data.data.Name, Usn : response.data.data.Usn,
                    Marks : response.data.data.Marks, Attendance : response.data.data.Attendance, 
                    ClassName: response.data.classname});
            })
            .catch(function (error){
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{width: 700}}>
                <h3>&nbsp;&nbsp;&nbsp;Student Details</h3>
                <br/>
                <form>
                    <div className="form-group"> 
                        <label>Class: </label>
                        <input  type="text"
                            className="form-control"
                            value={this.state.ClassName}
                            readOnly
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                            className="form-control"
                            value={this.state.Name}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>USN: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.Usn}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Marks: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.Marks}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Attendance: </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.Attendance}
                            readOnly
                        />
                    </div>
                </form>
            </div>
        )
    }
}