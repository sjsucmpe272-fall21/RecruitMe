import React from 'react'
import Header from './Components/Header'
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './Components/login';
import TinderCards from "./Components/TinderCards"
import RecruiterRoute from "./authHelper/RecruiterRoute"
import CandidateRoute from "./authHelper/CandidateRoute"
import TinderCardsForCandidates from "./Components/TinderCardsForCandidates"
import NewJobList from './Components/NewJobList';
import RecruiterDashboard from './Components/recruiter_dashboard/recruiter_dashboard'
import CandidateDashboard from './Components/candidate_dashboard/candidate_dashboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/chat">
          </Route>
          <Route exact path="/candidate">
            <TinderCardsForCandidates/>
          </Route>
          <RecruiterRoute exact path="/home">
            <TinderCards user="recruiter"/>
          </RecruiterRoute>
          <Route exact path="/newJobs">
            <NewJobList />
          </Route>
          <Route exact path="/recruiter_dashboard">
            <RecruiterDashboard />
          </Route>
          <Route exact path="/candidate_dashboard">
            <CandidateDashboard />
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
