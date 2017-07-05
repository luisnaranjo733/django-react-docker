import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './css/index.css';
import ListingPage from './components/ListingPage'
import SurveyPage from './components/SurveyPage'
import ConfirmationPage from './components/ConfirmationPage'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={ListingPage}/>
      <Route path="/Survey" component={SurveyPage}/>
    </div>
  </Router>
)
export default App