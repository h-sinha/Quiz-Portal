import React, { Component } from 'react';
import './App.css';

class DeleteQuestion extends Component {
	constructor() {
    super();
    this.state = {
      data: [], 
      errored : false,
    }
  }

   componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/view_questions');
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
		
	function deleteHandler(id, e) {

		fetch('http://localhost:8000/question/'+id, {
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
          <h1 className="App-title">Delete Question</h1>
        </header>
        {this.state.errored &&
          <div>
            <h2>
              Unable to fetch questions at the moment 
            </h2>
          </div>
        }
        <table className="table-hover">
          <thead>
            <tr>
              <th>Question</th>
              <th>Choice1</th>
              <th>Choice2</th>
              <th>Choice3</th>
              <th>Choice4</th>
              <th>Image Link</th>
              <th>Answer</th>
            </tr>
          </thead>
           {/* map runs function on each array element */}
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.question}</td>
                      <td>{item.choice1}</td>
                      <td>{item.choice2}</td>
                      <td>{item.choice3}</td>
                      <td>{item.choice4}</td>
                      {(() => {
                        if(item.multimedia){
                          return (<td>{item.multimedia}</td>);
                        }
                        else{
                          return (<td>No image</td>);
                        }
                    })()}    
                      <td>Choice {item.correct}</td>
                      <td><button className = "btn btn-danger" id={item.q_id} onClick ={deleteHandler.bind(this, item.q_id)}>Delete</button></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default DeleteQuestion;