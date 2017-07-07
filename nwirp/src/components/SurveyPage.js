import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setSurveys, setResponse } from '../redux'

import 'whatwg-fetch'
import '../css/survey.css';


const Header = () => (
  <header>
    <h1>Volunteer information</h1>
  </header>
);

class GeneralInformation extends Component {


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.setResponseParent(name, value);
    this.forceUpdate();
  }

  render() {
    console.log('rendering general information');
    return (
      <div>
        <h2>General information</h2>
        <p>{this.props.responses.volunteer_name}</p>

        <div className="input-field col s6">
          <input id="volunteer_name" name="volunteer_name" value={this.props.responses.volunteer_name} onChange={this.handleInputChange} type="text" className="validate" required></input>
          <label htmlFor="volunteer_name">Your name</label>
        </div>

        <div className="input-field col s6">
          <input id="volunteer_email" name="volunteer_email" type="email" className="validate" required></input>
          <label htmlFor="volunteer_email">Your email</label>
        </div>

        <div className="input-field col s6">
          <input id="volunteer_phone" name="volunteer_phone" type="tel" className="validate" required></input>
          <label htmlFor="volunteer_phone">Your phone</label>
        </div>

      </div>
    )
  }
}

const QuestionItem = (props) => (
  <div className="input-field col s6">
    {props.question.required && 
      <span>
        <input id={props.question.id} name={`q${props.question.id}`} type="text" className="validate" required></input>
        <label htmlFor={props.question.id}>*{props.question.question_text}</label>
      </span>
    }

    {!props.question.required && 
      <span>
        <input id={props.question.id} name={`q${props.question.id}`} type="text" className="validate"></input>
        <label htmlFor={props.question.id}>{props.question.question_text}</label>
      </span>
    }
    
  </div>
);

const SurveyItem = (props) => (
  <div className="section">
    <h3>{props.survey.name}</h3>
    <p>{props.survey.desc}</p>
    {props.survey.question_set.map((question, index) => (
      <QuestionItem key={index} question={question} />
    ))}

  </div>
);

const Test = () => (
  <h1>TEST</h1>
);

class SurveyList extends Component {
  render() {
    console.log(this.props.surveys);
    return (
      <div>
        <h2>Volunteer Surveys</h2>
        {this.props.surveys.map((survey, index) => (
          <SurveyItem key={index} survey={survey} />
        ))}
      </div>
    );
  }
}


class SurveyPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: ''
    };
  }

  componentDidMount() {
    // fetch opportunities from backend via api
    let url = 'http://ec2-54-218-9-42.us-west-2.compute.amazonaws.com/api/surveys/?format=json';
    url = 'http://ec2-54-218-9-42.us-west-2.compute.amazonaws.com/api/surveys/?format=json&opportunity_id=9&opportunity_id=4';
    // this.props.opportunity_preference_ids.forEach(id => {
    //   url += `&opportunity_id=${id}`;
    // });

    let outerThis = this;
    fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (opportunities) {
        let surveys = JSON.parse(opportunities);

        // then set them in state
        outerThis.props.dispatch(setSurveys(surveys));
      });
  }

  submitButtonPressed = (e) => {
    e.preventDefault();
    console.log('pressed');
  }

  
  setResponseParent = (name, value) => {
    console.log(`name: ${name} | value: ${value}`);
    console.log(this.props.responses);
    this.props.dispatch(setResponse(name, value));
    console.log(this.props.responses);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <form onSubmit={this.submitButtonPressed}>
          <GeneralInformation responses={this.props.responses} setResponseParent={this.setResponseParent}/>
          <SurveyList surveys={this.props.surveys} />
          <button className="btn waves-effect waves-light">Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    opportunities: state.opportunities,
    opportunity_preference_ids: state.opportunity_preference_ids,
    surveys: state.surveys,
    responses: state.responses
  }
}


export default connect(mapStateToProps)(SurveyPage);