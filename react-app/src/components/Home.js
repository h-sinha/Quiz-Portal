import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './App.css'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Quiczar</h1>
          <br/>
          <img src ="https://www.drupal.org/files/project-images/quiz-image_0.jpg"/>
        </header>
      </div>
    );
  }
}

export default Home;
