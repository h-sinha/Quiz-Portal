import React, { Component } from 'react';
import './App.css';
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class SelectQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data :[],
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/get_quizzes');
    fetch(request)
      .then(response => {
      response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({data: result.data});
            }
            else
            {
              this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));
  }

  render() {

    function submitHandler(id, e) {

    fetch('http://localhost:8000/startQuiz/'+id, {
      method: 'POST',
      })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          window.location.reload()
      });

    }


    return (
     <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select Quiz</h1>
        </header>
        {this.state.errored &&
          <div>
            <h2>
              Unable to fetch categories at the moment.
            </h2>
          </div>
        }
        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.name} &nbsp;&nbsp;&nbsp;&nbsp;
                      <Link to="/RunQuiz" >
                      <button className = "btn btn-danger" id={item.zid} onClick ={submitHandler.bind(this, item.zid)}>Play</button>
                      </Link>
                      </td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default SelectQuiz;
