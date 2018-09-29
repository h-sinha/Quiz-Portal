import React, { Component } from 'react';
import './App.css';

class RunQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [], 
      answers: [],
      index : 0,
      errored : false,
      loaded : false,
      done : false,
      score : 0,
      checkedBoxes: [],
      isChecked1 : false,
      isChecked2 : false,
      isChecked3 : false,
      isChecked4 : false,
    }
    this.handleCChange = this.handleCChange.bind(this);
    this.endquiz = this.endquiz.bind(this);
  }
  endquiz(){
    fetch('http://localhost:8000/endquiz', {
     method: 'POST',
     body: JSON.stringify({"score" :(this.state.score+5).toString()}),
   })
      .then(response => {
        response.json().then(
          result => {
            console.log(result.status);
            if(result.status === "SUCCESS")
            {
              // this.setState({errored: false});
              // this.setState({submitted: true});
            }
            else
            {
              // this.setState({submitted: false});
              // this.setState({errored: true});
            }
          },
          err => console.log(err))
      }, err => console.log(err));
  }

  checker(answers){
    var arr = answers.split(',');
    var array = [];
    for(var i=0;i<arr.length;i++){
      array.push(parseInt(arr[i]));
    }
    arr.sort();
    this.state.answers.sort();
    console.log(this.state.answers,array);
    if(array.length == this.state.answers.length){
      array.sort;
      answers.sort;
      console.log(answers);
      var len = array.length;
      var f = 0;
      for (var i = 0 ; i <len; i++) 
      {
        if(array[i] != this.state.answers[i])f=1;
      }
      console.log(f);
      if(f == 0){
         this.setState({score: this.state.score + 5});
      }
    }
    var len = array.length
    for (var i = 0 ; i <len; i++) 
      {
        this.state.answers.pop();
      }
     if(this.state.index == 4){
       this.setState({done : true});
       this.endquiz();
      return;
    }
     this.setState({"isChecked1" :false});
        this.setState({"isChecked2" :false});
        this.setState({"isChecked3" :false});
        this.setState({"isChecked4" :false});
     this.setState({index : this.state.index+1});
  }
  handleCChange(id,event) {
    if(this.state.answers.indexOf(id) == -1){
        this.state.answers.push(parseInt(id));
    }
      else{
        this.state.answers.splice(this.state.answers.indexOf(id),id);
      }
      if(id == "1"){
        this.setState({"isChecked1" : !this.state.isChecked1});
      }
       if(id == "2"){
        this.setState({"isChecked2" : !this.state.isChecked2});
      }
       if(id == "3"){
        this.setState({"isChecked3" : !this.state.isChecked3});
      }
       if(id == "4"){
        this.setState({"isChecked4" : !this.state.isChecked4});
      }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/runQuiz');
    fetch(request)
    .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({data: result.data, loaded : true});
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
    if(!this.state.loaded)
      return null;
    if(this.state.done == 1)
    {
      return (
        <div className="App">
        <header className="App-header">
        </header>
          <h2>Final Score {this.state.score}</h2>
        </div>
      );
    }
    else{
    const ques = this.state.data[this.state.index];
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Questions</h1>
        </header>
        {this.state.errored &&
          <div>
            <h2>
              Unable to fetch questions at the moment.
            </h2>
          </div>
      }
      <div align="right">
       <h2>
        Score : {this.state.score}
        </h2>
        </div>
      <div>
      <h3>
      {ques.question}
      </h3>
      <br/><br/>
      {(() => {
          if(ques.multimedia){
            return (<div><img src={ques.multimedia} alt={ques.question} /></div>);
          }
          else{
            return null;
          }
      })()}      
      <br/>
      <div className="choices">
       <input type="checkbox"  onClick ={this.handleCChange.bind(this, "1")} checked={this.state.isChecked1}/> {ques.choice1}<br/>
      <input type="checkbox"   onClick ={this.handleCChange.bind(this,"2")}checked={this.state.isChecked2}/> {ques.choice2}<br/>
      <input type="checkbox"  onClick ={this.handleCChange.bind(this,"3")} checked={this.state.isChecked3}/> {ques.choice3}<br/>
      <input type="checkbox"  onClick ={this.handleCChange.bind(this,"4")} checked={this.state.isChecked4}/> {ques.choice4}<br/>
     </div>
      <button className = "btn btn-danger" id={ques.qid} onClick ={this.checker.bind(this, ques.correct)}>Check</button>
     </div>
      </div>
    );
  }
  }
}
export default RunQuiz;
