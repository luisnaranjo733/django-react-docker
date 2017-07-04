// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const ListingPage = () => (
  <div>
    <h2>Listing</h2>
  </div>
)

const SurveyPage = () => (
  <div>
    <h2>SurveyPage</h2>
  </div>
)

const ConfirmationPage = ({ match }) => (
  <div>
    <h3>ConfirmationPage</h3>
  </div>
)

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">ListingPage</Link></li>
        <li><Link to="/survey">SurveyPage</Link></li>
        <li><Link to="/confirmation">ConfirmationPage</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={ListingPage}/>
      <Route path="/survey" component={SurveyPage}/>
      <Route path="/confirmation" component={ConfirmationPage}/>
    </div>
  </Router>
)
export default App