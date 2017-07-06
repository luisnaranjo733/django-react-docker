import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

console.log('we out here tho!!!!');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
