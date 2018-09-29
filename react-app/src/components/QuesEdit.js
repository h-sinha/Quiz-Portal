import React, { Component } from 'react';
import './App.css';

class QuesEdit extends Component {
 constructor() {
    super();
    this.state = {
      data1 :[],
      data:[],
      formData: {
        Question: "",
        Cid: "",
        Choice1: "",
        Choice2: "",
        Choice3: "",
        Choice4: "",
        Correct: "",
        Multimedia: "",
        loaded : false,
      },
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handleC1Change = this.handleC1Change.bind(this);
    this.handleC2Change = this.handleC2Change.bind(this);
    this.handleC3Change = this.handleC3Change.bind(this);
    this.handleC4Change = this.handleC4Change.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleCorChange = this.handleCorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMulChange = this.handleMulChange.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/getcurques');
    fetch(request)
     .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({errored: false});
              this.setState({data1: result.data});
            }
            else
            {
              this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));

     const request2 = new Request('http://127.0.0.1:8000/get_categories');
    fetch(request2)
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
              // this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));

  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(this.state.formData)
    fetch('http://localhost:8000/editQuestion', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleQChange(event) {
    this.state.formData.Question = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.Cid = event.target.value;
  }
  handleC1Change(event) {
    this.state.formData.Choice1 = event.target.value;
  }
  handleC2Change(event) {
    this.state.formData.Choice2 = event.target.value;
  }
  handleC3Change(event) {
    this.state.formData.Choice3 = event.target.value;
  }
  handleC4Change(event) {
    this.state.formData.Choice4 = event.target.value;
  }
handleCorChange(event) {
    this.state.formData.Correct = event.target.value;
  }
  handleMulChange(event) {
    this.state.formData.Multimedia = event.target.value;
  }

  render() {
    if(!this.state.loaded){
      return null;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Edit Question</h1>
        </header>
        <br/><br/>
        {this.state.submitted &&
          <div>
            <h2>
              Question Updated.
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
                <label>Question</label>
                <input type="text" className="form-control" placeholder = {this.state.data1.question} value={this.state.Question} onChange={this.handleQChange}/>
            </div>
            <div>
              <label>Category</label>
                <select name="Category" onChange={this.handleCChange}>
                 <option disabled selected value> -- select an option -- </option>
                {this.state.data.map(function(item, key) {
               return (
                <option key={key} value = {item.cid} >{item.category}</option>
                )
             })}
                </select>
            </div>
            <div className="form-group">
                <label>Choices</label>
                <input type="text" className="form-control" placeholder = {this.state.data1.choice1} value={this.state.Choice1} onChange={this.handleC1Change}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder = {this.state.data1.choice2} value={this.state.Choice2} onChange={this.handleC2Change}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder = {this.state.data1.choice3} value={this.state.Choice3} onChange={this.handleC3Change}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" placeholder = {this.state.data1.choice4}value={this.state.Choice4} onChange={this.handleC4Change}/>
            </div>
            <div className="form-group">
                <label>Correct Choice Number</label>
                <input type="text" className="form-control" placeholder = {this.state.data1.correct} value={this.state.Correct} onChange={this.handleCorChange}/>
            </div>
            <div className="form-group">
                <label>Image Link</label>
                <input type="text" className="form-control" placeholder = {this.state.data1.multimedia} value={this.state.Multimedia} onChange={this.handleMulChange}/>
            </div>

                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

      </div>
    );
  }
}
export default QuesEdit;
