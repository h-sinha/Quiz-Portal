import React, { Component } from 'react';
import './App.css';

class DisplayLeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      errored : false,
      loaded : false,
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/leaderboard');
    fetch(request)
        .then(response => {
        response.json().then(
          result => {
            console.log(result.status);
            if(result.status === "SUCCESS")
            {
              this.setState({data: result.data});
              this.setState({loaded: true});
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
    if(!this.state.loaded){
      return null;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LeaderBoard</h1>
        </header>
        {this.state.errored &&
          <div>
            <h2>
              Unable to fetch LeaderBoard at the moment.
            </h2>
          </div>
        }
        <table className="table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Score</th>
            </tr>
          </thead>
           {/* map runs function on each array element */}
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default DisplayLeaderBoard;
