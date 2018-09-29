import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import EditQuestion from './EditQuestion';
import NewPerson from './NewPerson';
import Home from './Home';
import Login from './Login';
import AddQuestion from './AddQuestion';
import AddCategory from './AddCategory';
import DeleteQuestion from './DeleteQuestion';
import Quiz from './Quiz';
import RunQuiz from './RunQuiz';
import Leaderboard from './Leaderboard';
import DisplayLeaderBoard from './DisplayLeaderBoard';
import AddQuiz from './AddQuiz';
import SelectQuiz from './SelectQuiz';
import Logout from './Logout';
import EditQuiz from './EditQuiz';
import QEdit from './QEdit';
import ViewAttempted from './ViewAttempted';
import DeleteQuiz from './DeleteQuiz'
import QuesEdit from './QuesEdit'
// import Admin from './Admin';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {

	constructor() {
    super();
    this.state = {
      adminMode: false,
      loggedIn : false,
      userName : "",
    }
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8000/isadmin');
    fetch(request)
    .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({adminMode: result.admin});
             
            }
            else
            {
              this.setState({adminMode: result.admin});
            }
          },
          err => console.log(err))
      }, err => console.log(err));

     const request1 = new Request('http://127.0.0.1:8000/islogged');
    fetch(request1)
    .then(response => {
        response.json().then(
          result => {
            if(result.status === "SUCCESS")
            {
              this.setState({loggedIn: true});
              this.setState({userName: result.user});
              }
            else
            {
              this.setState({loggedIn: false});
            }
          },
          err => console.log(err))
      }, err => console.log(err));
  }


  render() {
    console.log(this.state.loggedIn);
    if (this.state.adminMode == true && this.state.loggedIn == true){
         return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiczar</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                <li>
                  <div class="dropdown">
                 <button class="btn" type="button" data-toggle="dropdown">Question
                  <span class="label label-default"></span></button>
                   <ul class="dropdown-menu">
                      <li><Link to={'/EditQuestion'}>Edit Question</Link></li>
                      <li><Link to={'/AddQuestion'}>AddQuestion</Link></li>
                      <li><Link to={'/DeleteQuestion'}>DeleteQuestion</Link></li>
                    </ul>
                  </div>
                  </li>
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li> 
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  <li><Link to={'/AddCategory'}>AddCategory</Link></li>
                  <li>
                  <div class="dropdown">
                 <button class="btn" type="button" data-toggle="dropdown">Quiz
                  <span class="label label-default"></span></button>
                   <ul class="dropdown-menu">
                      <li><Link to={'/Quiz'}>Play Quiz</Link></li>
                      <li><Link to={'/AddQuiz'}>AddQuiz</Link></li>
                      <li><Link to={'/EditQuiz'}>EditQuiz</Link></li>
                      <li><Link to={'/DeleteQuiz'}>DeleteQuiz</Link></li>
                      <li><Link to={'/ViewAttempted'}>Attempted Quizzes</Link></li>
                    </ul>
                  </div>
                  </li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
                  <div align="right"><h4>Hello {this.state.userName} !</h4></div>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home}/>
                 <Route exact path='/NewPerson' component={NewPerson} />
                 <Route exact path='/EditQuestion' component={EditQuestion} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/AddQuestion' component={AddQuestion} />
                 <Route exact path='/AddCategory' component={AddCategory} />
                 <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                 <Route exact path='/Quiz' component={Quiz} />
                 <Route exact path='/RunQuiz' component={RunQuiz} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/DisplayLeaderBoard' component={DisplayLeaderBoard} />
                 <Route exact path='/AddQuiz' component={AddQuiz} />
                 <Route exact path='/SelectQuiz' component={SelectQuiz} />
                 <Route exact path='/EditQuiz' component={EditQuiz} />
                 <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                 <Route exact path='/QEdit' component={QEdit} />
                 <Route exact path='/ViewAttempted' component={ViewAttempted} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route exact path='/QuesEdit' component={QuesEdit} />
            </Switch>
          </div>
        </Router>
      </div>
      );
    }
  	else if (this.state.adminMode == true){
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiczar</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/NewPerson'}>Register</Link></li>
                  <li><Link to={'/EditQuestion'}>Edit Question</Link></li>
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                  <li><Link to={'/AddQuestion'}>AddQuestion</Link></li>
                  <li><Link to={'/AddCategory'}>AddCategory</Link></li>
                  <li><Link to={'/DeleteQuestion'}>DeleteQuestion</Link></li>
                  <li><Link to={'/Quiz'}>Quiz</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/AddQuiz'}>AddQuiz</Link></li>
                  <li><Link to={'/EditQuiz'}>EditQuiz</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home}/>
                 <Route exact path='/NewPerson' component={NewPerson} />
                 <Route exact path='/EditQuestion' component={EditQuestion} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/AddQuestion' component={AddQuestion} />
                 <Route exact path='/AddCategory' component={AddCategory} />
                 <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                 <Route exact path='/Quiz' component={Quiz} />
                 <Route exact path='/RunQuiz' component={RunQuiz} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/DisplayLeaderBoard' component={DisplayLeaderBoard} />
                 <Route exact path='/AddQuiz' component={AddQuiz} />
                 <Route exact path='/SelectQuiz' component={SelectQuiz} />
                 <Route exact path='/EditQuiz' component={EditQuiz} />
                 <Route exact path='/QEdit' component={QEdit} />
            </Switch>
          </div>
        </Router>
      </div>
    );
   }
   else if (this.state.loggedIn == false){
   		return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiczar</Link>
                </div>
                <ul className="nav navbar-nav">
                   <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/NewPerson'}>Register</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home}/>
                 <Route exact path='/NewPerson' component={NewPerson} />
                 <Route exact path='/EditQuestion' component={EditQuestion} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/AddQuestion' component={AddQuestion} />
                 <Route exact path='/AddCategory' component={AddCategory} />
                 <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                 <Route exact path='/Quiz' component={Quiz} />
                 <Route exact path='/RunQuiz' component={RunQuiz} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/DisplayLeaderBoard' component={DisplayLeaderBoard} />
                 <Route exact path='/SelectQuiz' component={SelectQuiz} />
            </Switch>
          </div>
        </Router>
      </div>
    );
   }
   else if (this.state.loggedIn == true){
      return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiczar</Link>
                </div>
                <ul className="nav navbar-nav">
                   <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/Quiz'}>Quiz</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/ViewAttempted'}>Attempted Quizzes</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
                  <div align="right"><h4>Hello {this.state.userName} !</h4></div>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home}/>
                 <Route exact path='/NewPerson' component={NewPerson} />
                 <Route exact path='/EditQuestion' component={EditQuestion} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/AddQuestion' component={AddQuestion} />
                 <Route exact path='/AddCategory' component={AddCategory} />
                 <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                 <Route exact path='/Quiz' component={Quiz} />
                 <Route exact path='/RunQuiz' component={RunQuiz} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/DisplayLeaderBoard' component={DisplayLeaderBoard} />
                 <Route exact path='/ViewAttempted' component={ViewAttempted} />
                 <Route exact path='/SelectQuiz' component={SelectQuiz} />
                 <Route exact path='/Logout' component={Logout} />
            </Switch>
          </div>
        </Router>
      </div>
    );
   }

  }
}

export default App;
