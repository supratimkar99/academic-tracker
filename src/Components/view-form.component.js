import React, { Component } from 'react';
import axios from 'axios';
var info = '';

export default class ViewForm extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeUSN = this.onChangeUSN.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            usn: '',
            code: '', 
        }
    }

    onChangeCode(e) {
        this.setState( {
            code: e.target.value
        });
    }

    onChangeUSN(e) {
        this.setState({
            usn: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Class Code: ${this.state.code}`);
        console.log(`Student USN: ${this.state.usn}`);

        info += this.state.code;
        info += ",";
        info += this.state.usn;

        console.log(info);

        axios.get('http://localhost:4000/classes/students/view/'+info)
            .then(res => {
                console.log(res.data);
                if(res.data.status === "success") {
                    //alert("Details Found !");
                    this.props.history.push("/view-student/"+info);
                } else {
                    alert("Details not found !")
                }
            });
    }
    
    render() {
        return (
            <div style={{width:700}}>
                <h3>&nbsp;&nbsp;&nbsp;Enter Student Details</h3>
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Class Code: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.code}
                                onChange={this.onChangeCode}
                                />
                    </div>
                    <div className="form-group">
                        <label>USN: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.usn}
                                onChange={this.onChangeUSN}
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Enter" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}