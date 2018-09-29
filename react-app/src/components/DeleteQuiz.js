import React, { Component } from 'react';
import './App.css';

class DeletePerson extends Component {
	constructor() {
    super();
    this.state = {
      data: [], 
      errored : false,
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
  handleCChange(id,event) {

    console.log(this.state.answers.indexOf(id));
    if(this.state.answers.indexOf(id) == -1){
        this.state.answers.push(id);
    }
      else{
        this.state.answers.splice(this.state.answers.indexOf(id),id);
      }
   }
   
  render() {
		
	function deleteHandler(id, e) {
    fetch('http://localhost:8000/delquiz/'+id, {
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
          <h1 className="App-title">Delete Quiz</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz-Name</th>
            </tr>
          </thead>
           {/* map runs function on each array element */}
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.name}</td>
                      <td><button className = "btn btn-danger" id={item.zid} onClick ={deleteHandler.bind(this, item.zid)}>Delete</button></td>
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