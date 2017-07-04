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
    <Route exact path="/" component={ListingPage}/>
  </Router>
)
export default App