import React from 'react'
import Header from './Components/Header'
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Login/login';
import TinderCards from "./Components/TinderCards"
import RecruiterRoute from "./authHelper/RecruiterRoute"
import CandidateRoute from "./authHelper/CandidateRoute"
import TinderCardsForCandidates from "./Components/TinderCardsForCandidates"

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/chat">
          </Route>
          <Route exact path="/candidate">
            <TinderCardsForCandidates/>
          </Route>
          <RecruiterRoute exact path="/">
            <TinderCards user="recruiter"/>
          </RecruiterRoute>
          <Route exact path="/login">
            <Login />
          </Route>
          {/* <CandidateRoute path="/">
            <TinderCards user="candidate"/>
          </CandidateRoute> */}
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
