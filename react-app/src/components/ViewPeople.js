import React, { Component } from 'react';
import './App.css';

class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/view_users');
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All People</h1>
        </header>
        {this.state.errored &&
          <div>
            <h2>
              Unable to fetch User details at the moment.
            </h2>
          </div>
        }
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
           {/* map runs function on each array element */}
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.uid}</td>
                      <td>{item.name}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewPeople;
