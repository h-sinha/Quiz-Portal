import React, { Component } from 'react';
import './App.css';
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Name: "",
        Password: "",
      },
      submitted: false,
      errored : false,
    }
    this.handleNChange = this.handleNChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextTypes = {
    router : PropTypes.object,
  }
  handleSubmit (event) {
  const thisis = this;
    event.preventDefault();
    fetch('http://localhost:8000/login', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({errored: false});
              window.location.reload();
             this.context.router.history.push("/");
              // this.setState({submitted: true});
            }
            else
            {
              console.log(result.status)
              this.setState({submitted: true});
              // this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));
  }

  handleNChange(event) {
    this.state.formData.Name = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.Password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
         {this.state.submitted &&
          <div>
            <h2>
              Wrong Username or Password
            </h2>
          </div>
        }
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.Name} onChange={this.handleNChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.Password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

      </div>
    );
  }
}

export default Login;
