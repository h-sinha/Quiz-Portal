import React, { Component } from 'react';
import './App.css';

class NewPerson extends Component {
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

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8000/register', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({errored: false});
              this.setState({submitted: true});
            }
            else
            {
              this.setState({submitted: false});
              this.setState({errored: true});
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
          <h1 className="App-title">Register</h1>
        </header>
        <br/><br/>
        
        {this.state.submitted &&
          <div>
            <h2>
              You have successfully registered .
            </h2>
          </div>
        }
        {this.state.errored &&
          <div>
            <h2>
              Username already exists.
            </h2>
          </div>
        }
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
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

export default NewPerson;
