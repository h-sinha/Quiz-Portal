import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import EditQuestion from './EditQuestion';
import NewPerson from './NewPerson';
import HomeHandler from './HomeHandler';
import Login from './Login';
import AddQuestion from './AddQuestion';
import AddCategory from './AddCategory';
import DeleteQuestion from './DeleteQuestion';
import Quiz from './Quiz';
import RunQuiz from './RunQuiz';
import Leaderboard from './Leaderboard';
import DisplayLeaderBoard from './DisplayLeaderBoard';
// import Admin from './Admin';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class Navbar extends Component {
  render() {
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
                  <li><Link to={'/NewPerson'}>Create Person</Link></li>
                  <li><Link to={'/EditQuestion'}>Edit Question</Link></li>
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                  <li><Link to={'/AddQuestion'}>AddQuestion</Link></li>
                  <li><Link to={'/AddCategory'}>AddCategory</Link></li>
                  <li><Link to={'/DeleteQuestion'}>DeleteQuestion</Link></li>
                  <li><Link to={'/Quiz'}>Quiz</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </Router>
      </div>
    );
  }
}

export default Navbar;
