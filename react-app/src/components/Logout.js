import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types'

class Logout extends Component {
  constructor() {
    super();
  }
   static contextTypes = {
    router : PropTypes.object,
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/logout');
    fetch(request)
    .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              // 
              this.setState({errored: false});
              window.location.reload();
              this.context.router.history.push("/");
            }
            else
            {
              // 
            }
          },
          err => console.log(err))
      }, err => console.log(err));
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
          <h2>Logged Out</h2>
      </div>
    );
  }
}

export default Logout;
