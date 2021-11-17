import React from 'react'
import Header from './Header'
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import TinderCards from "./TinderCards"
import Login from './Login/login';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/chat"></Route>
          <Route exact path="/"><TinderCards/></Route>
          <Route exact path="/login"><Login /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
