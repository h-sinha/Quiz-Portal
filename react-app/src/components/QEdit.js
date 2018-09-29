import React, { Component } from 'react';
import './App.css';

class QEdit extends Component {
  constructor() {
    super();
    this.state = {
      data :[],
      data1 : [],
      nameis : "",
      formData: {
        name : "",
        q1id: "",
        q2id: "",
        q3id: "",
        q4id: "",
        q5id: "",
        cid: "",
      },
      submitted: false,
      errored : false,
      loaded : false,
    }
    this.handleNChange = this.handleNChange.bind(this);
    this.handleQ1Change = this.handleQ1Change.bind(this);
    this.handleQ2Change = this.handleQ2Change.bind(this);
    this.handleQ3Change = this.handleQ3Change.bind(this);
    this.handleQ4Change = this.handleQ4Change.bind(this);
    this.handleQ5Change = this.handleQ5Change.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMulChange = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const request2 = new Request('http://127.0.0.1:8000/get_categories');
    fetch(request2)
     .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({data1: result.data});
            }
            else
            {
              // this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));

 const request3 = new Request('http://127.0.0.1:8000/getallq');
    fetch(request3)
     .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({data2: result.data});
            }
            else
            {
              // this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));

 const request1 = new Request('http://127.0.0.1:8000/getqname');
    fetch(request1)
      .then(response => {
      response.json().then(
          result => {
            console.log(result);
            if(result.status === "SUCCESS")
            {
              this.setState({nameis: result.data});
            }
            else
            {
              this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));

    const request = new Request('http://127.0.0.1:8000/getquest');
    fetch(request)
     .then(response => {
        response.json().then(
          result => {
            console.log(result.data);

            if(result.status === "SUCCESS")
            {
              this.setState({data: result.data});
              this.setState({loaded: true});
            }
            else
            {
              // this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));
     
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.formData);

    fetch('http://localhost:8000/editQuiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        response.json().then(
          result => {
            console.log(result.status);
            if(result.status === "SUCCESS")
            {
              this.setState({submitted: true});
              this.setState({errored: false});
            }
            else
            {
              this.setState({submitted: false});
              this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));
  }
 handleMulChange(event) {
    this.state.formData.Multimedia = event.target.value;
  }

  getQuestion(id) {
     const request = new Request('http://127.0.0.1:8000/get_categories');
    fetch('http://localhost:8000/getques/'+id)
     .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              // this.setState({errored: true});
              this.setState({data1: result.data});
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
   handleNChange(event) {
    this.state.formData.Name = event.target.value;
  }
  handleQ1Change(event) {
    this.state.formData.q1id = event.target.value;
  }
   handleQ2Change(event) {
    this.state.formData.q2id = event.target.value;
  }
   handleQ3Change(event) {
    this.state.formData.q3id = event.target.value;
  }
   handleQ4Change(event) {
    this.state.formData.q4id = event.target.value;
  }
  handleQ5Change(event) {
    this.state.formData.q5id = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.cid = event.target.value;
    this.getQuestion(event.target.value);
  }
  render() {
    if(!this.state.loaded)
      return null;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Edit Quiz</h1>
        </header>
        <br/><br/>
         {this.state.submitted &&
          <div>
            <h2>
              Quiz Updated.
            </h2>
          </div>
        }
        {this.state.errored &&
          <div>
            <h2>
              Unable to update.
            </h2>
          </div>
        }
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
                <label>Quiz-Name</label>
                <input type="text" className="form-control" value={this.state.Name} placeholder={this.state.nameis} onChange={this.handleNChange}/>
            </div>
            <div>
              <label>Category</label>
                <select name="Category" onChange={this.handleCChange}>
                 <option > -- select an option -- </option>
                {this.state.data1.map(function(item, key) {
               return (
                <option key={key} value = {item.cid}  >{item.category}</option>
                )
             })}
                </select>
            </div>
             <div>
              <label>Question1 </label>
                <select name="Question1" onChange={this.handleQ1Change}>
                 <option > {this.state.data[0].question} </option>
                {this.state.data2.map(function(item, key) {
               return (
                <option key={key} value = {item.q_id} >{item.question}</option>
                )
             })}
                </select>
            </div>

             <div>
              <label>Question2 </label>
                <select name="Question2" onChange={this.handleQ2Change}>
                 <option > {this.state.data[1].question} </option>
                {this.state.data2.map(function(item, key) {
               return (
                <option key={key} value = {item.q_id} >{item.question}</option>
                )
             })}
                </select>
            </div>

             <div>
              <label>Question3 </label>
                <select name="Question3" onChange={this.handleQ3Change}>
                 <option > {this.state.data[2].question} </option>
                {this.state.data2.map(function(item, key) {
               return (
                <option key={key} value = {item.q_id} >{item.question}</option>
                )
             })}
                </select>
            </div>

             <div>
              <label>Question4 </label>
                <select name="Question4" onChange={this.handleQ4Change}>
                 <option > {this.state.data[2].question} </option>
                {this.state.data2.map(function(item, key) {
               return (
                <option key={key} value = {item.q_id} >{item.question}</option>
                )
             })}
                </select>
            </div>

             <div>
              <label>Question5 </label>
                <select name="Question5" onChange={this.handleQ5Change}>
                 <option > {this.state.data[4].question} </option>
                {this.state.data2.map(function(item, key) {
               return (
                <option key={key} value = {item.q_id} >{item.question}</option>
                )
             })}
                </select>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

      </div>
    );
  }
}

export default QEdit;
