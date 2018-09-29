import React, { Component } from 'react';
import './App.css';
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      data :[],
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/get_categories');
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

    fetch('http://localhost:8000/setCat/'+id, {
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
          <h1 className="App-title">Select Category</h1>
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
              <th>Category</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>
                      <Link to="/SelectQuiz" >
                      <button className = "btn btn-primary" id={item.cid} onClick ={submitHandler.bind(this, item.cid)}>{item.category}</button>
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

export default Quiz;
