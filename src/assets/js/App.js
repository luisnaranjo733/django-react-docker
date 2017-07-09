import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './redux'

import './css/index.css';
import ListingPage from './components/ListingPage'
import SurveyPage from './components/SurveyPage'
import ConfirmationPage from './components/ConfirmationPage'


let store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={ListingPage} />
        <Route path="/Survey" component={SurveyPage} />
        <Route path="/Done" component={ConfirmationPage} />
      </div>
    </Router>
  </Provider>
)
export default App