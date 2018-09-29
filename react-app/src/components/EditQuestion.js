import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class EditQuestion extends Component {

	constructor() {
	    super();
   	 this.state = {
   	   data: [], 
       loaded: false,
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
              this.setState({loaded: true});
            }
            else
            {
              this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));
     console.log(this.state.data1);
  }
handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.formData)
    fetch('http://localhost:8000/addQuestion', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  render() {
    function submitHandler(id, e) {

    fetch('http://localhost:8000/setques/'+id, {
      method: 'POST',
      })
      .then(response =>{
        if(response.status >= 200 && response.status < 300)
          window.location.reload()
      });

    }


    if(this.state.loaded == false){
      return null;
    }
    return (
     <div className="App">
        <header className="App-header">
          <h1 className="App-title">Edit Question</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Question</th>
            </tr>
          </thead>
           {/* map runs function on each array element */}
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.question}</td>
                      <td>
                      <Link to="/QuesEdit" >
                      <button className = "btn btn-primary" id={item.q_id} onClick ={submitHandler.bind(this, item.q_id)}>Select</button>
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

export default EditQuestion;
