import React, { Component } from 'react';
import './App.css';

class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      data :[],
      formData: {
      	Category : ""
      },
      submitted: false,
      errored: false,
      unauth : false,
    }
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8000/addCategory', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({errored: false});
              this.setState({submitted: true});
              this.setState({unauth: false});
            }
            else if(result.status === "UNAUTH")
            {
              this.setState({errored: false});
              this.setState({unauth: true});
              this.setState({submitted: false});
            }
            else
            {
              this.setState({submitted: false});
              this.setState({errored: true});
              this.setState({unauth: false});
            }
          },
          err => console.log(err))
      }, err => console.log(err));
  }

  handleCChange(event) {
    this.state.formData.Category = event.target.value;
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Add Category</h1>
        </header>
        <br/><br/>
         {this.state.submitted &&
          <div>
            <h2>
              New Category successfully added.
            </h2>
          </div>
        } 
         {this.state.unauth &&
          <div>
            <h2>
              Not authorized to add Category.
            </h2>
          </div>
        } 
        {this.state.errored &&
          <div>
            <h2>
              Category already exists
            </h2>
          </div>
        }
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Category</label>
                <input type="text" className="form-control" value={this.state.Category} onChange={this.handleCChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

       
      </div>
    );
  }
}

export default AddCategory;
