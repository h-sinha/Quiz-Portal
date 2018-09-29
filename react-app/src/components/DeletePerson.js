import React, { Component } from 'react';
import './App.css';

class DeletePerson extends Component {
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
              this.setState({errored: false});
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
		
	function deleteHandler(id, e) {

		fetch('http://localhost:8000/users/'+id, {
     	method: 'DELETE',
   		})
      .then(response => {
        if(response.status >= 200 && response.status < 300)
        	window.location.reload();
      });

  	}
    return (
     <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete People</h1>
        </header>

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
                      <td><button className = "btn btn-danger" id={item.uid} onClick ={deleteHandler.bind(this, item.uid)}>Delete</button></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default DeletePerson;