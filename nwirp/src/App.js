import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import ListingPage from './components/ListingPage'
import SurveyPage from './components/SurveyPage'
import ConfirmationPage from './components/ConfirmationPage'

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