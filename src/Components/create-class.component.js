import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import clapic from '../clapic.png'

function makeid() {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwzyz';
    var l = characters.length;
    for( var i=0; i<11; i++) {
        if(i === 3 || i === 7) {
            result += '-';
        } else {
            result += characters.charAt(Math.floor(Math.random() * l));
        }
    }
    return result;
}

export default class CreateClass extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeClassName = this.onChangeClassName.bind(this);
        this.onChangeClassDesc = this.onChangeClassDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            class_name: '',
            class_code: '',
            class_owner: '',
            class_desc: ''    
        }
    }

    onChangeClassName(e) {
        this.setState( {
            class_name: e.target.value
        });
    }

    onChangeClassDesc(e) {
        this.setState({
            class_desc: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Class Name: ${this.state.class_name}`);
        console.log(`Class Code: ${this.state.class_code}`);
        console.log(`Class Owner: ${this.state.class_owner}`);
        console.log(`Class Description: ${this.state.class_desc}`);

        const newClass = {
            ClassName: this.state.class_name,
            ClassCode: makeid(),
            Owner: this.props.match.params.id,
            Description: this.state.class_desc
        };

        axios.post('http://localhost:4000/classes/'+this.props.match.params.id, newClass)
            .then(res => {
                console.log(res.data);
                alert("Class Created");
            });
        
        this.setState({
            class_name: '',
            class_code: '',
            class_owner: '',
            class_desc: ''
        })
    }
    
    render() {
        return (
            <div>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <span class="navbar-brand" target="_blank">
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
            <div style={{width: 700}}>
                <h3>&nbsp;&nbsp;&nbsp;Create New Class</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Class Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.class_name}
                                onChange={this.onChangeClassName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Class Description: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.class_desc}
                                onChange={this.onChangeClassDesc}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Class" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            </div>
        )
    }
}