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
import ViewJob from './Components/job/view_job'
import SELREJ from './Components/candidate/sel_rej'
import CandidateSignUp from './Components/Signup/CandidateSignup';
import EmployerSignUp from './Components/Signup/EmployerSignup';
import CompanySignUp from './Components/Signup/CompanySignup';
import CandidateDesiredFilter from './Components/candidate/CandidateDesiredFilter';
import { Form, Formik } from 'formik';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/chat">
          </Route>
          <Route exact path="/recruiter">
            <TinderCards user="recruiter"/>
          </Route>
           <Route exact path="/candidate">
            <TinderCardsForCandidates/>
          </Route>
          {/* <Route exact path="/">
            <TinderCards/>
          </Route> */}
          <Route exact path="/newJobs">
            <NewJobList />
          </Route>
          <Route exact path="/recruiter_dashboard">
            <RecruiterDashboard />
          </Route>
          <Route exact path="/candidate_dashboard">
            <CandidateDashboard />
          </Route>
          <Route exact path="/view_job">
            <ViewJob />
          </Route>
          <Route exact path="/sel_rej_can">
            <SELREJ />
          </Route>
          <Route exact path="/candidateSignup">
            <CandidateSignUp />
          </Route>
          <Route exact path="/employerSignup">
            <EmployerSignUp />
          </Route>
          <Route exact path="/companySignup">
            <CompanySignUp />
          </Route>
          <Route exact path="/applyFilters">
            <CandidateDesiredFilter />
          </Route>
          <Route exact path="/profile">
            <Profile />
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
