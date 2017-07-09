import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setSurveys, setResponse, setGeneralInformation, setRegisteredVolunteer } from '../redux'
import { postRequest } from '../utils'

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

    this.props.setGeneralInformation(name, value);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <h2>General information</h2>
        <p>{this.props.general_information.volunteer_name}</p>

        <div className="input-field col s6">
          <input id="volunteer_name" name="volunteer_name" value={this.props.general_information.volunteer_name} onChange={this.handleInputChange} type="text" className="validate" required></input>
          <label htmlFor="volunteer_name">Your name</label>
        </div>

        <div className="input-field col s6">
          <input id="volunteer_email" name="volunteer_email" value={this.props.general_information.volunteer_email} onChange={this.handleInputChange} type="email" className="validate" required></input>
          <label htmlFor="volunteer_email">Your email</label>
        </div>

        <div className="input-field col s6">
          <input id="volunteer_phone" name="volunteer_phone" value={this.props.general_information.volunteer_phone} onChange={this.handleInputChange} type="tel" className="validate" required></input>
          <label htmlFor="volunteer_phone">Your phone</label>
        </div>

      </div>
    )
  }
}

class QuestionItem extends Component {

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.setResponseParent(name, value);
    this.forceUpdate();
  }

  render() {
    let question_id = `q${this.props.question.id}`;
    return (
      <div className="input-field col s6">
        {this.props.question.required &&
          <span>
            <input id={question_id} name={question_id} value={this.props.responses[question_id]} onChange={this.handleInputChange} type="text" className="validate" required></input>
            <label htmlFor={this.props.question.id}>*{this.props.question.question_text}</label>
          </span>
        }

        {!this.props.question.required &&
          <span>
            <input id={question_id} name={question_id} value={this.props.responses[question_id]} onChange={this.handleInputChange} type="text" className="validate"></input>
            <label htmlFor={this.props.question.id}>{this.props.question.question_text}</label>
          </span>
        }

      </div>
    );
  }
}


const SurveyItem = (props) => (
  <div className="section">
    <h3>{props.survey.name}</h3>
    <p>{props.survey.desc}</p>
    {props.survey.question_set.map((question, index) => (
      <QuestionItem key={index} question={question} responses={props.responses} setResponseParent={props.setResponseParent} />
    ))}

  </div>
);


class SurveyList extends Component {
  render() {
    this.props.surveys.forEach(survey => {
      survey.question_set.forEach(question => {
        this.props.setResponseParent(`q${question.id}`, '');
      })
    })
    return (
      <div>
        <h2>Volunteer Surveys</h2>
        {this.props.surveys.map((survey, index) => (
          <SurveyItem key={index} survey={survey} responses={this.props.responses} setResponseParent={this.props.setResponseParent}/>
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
    url = 'http://localhost/api/surveys/?format=json';
    this.props.opportunity_preference_ids.forEach(id => {
      url += `&opportunity_id=${id}`;
    });

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
    let url = 'http://localhost/api/submit/?format=json';

    let data = new FormData();

    // General volunteer information
    data.append('volunteer_name', this.props.general_information.volunteer_name)
    data.append('volunteer_email', this.props.general_information.volunteer_email)
    data.append('volunteer_phone', this.props.general_information.volunteer_phone)

    // list of opportunity preference ids
    this.props.opportunity_preference_ids.forEach(id => {
      data.append('opportunity_preference_id', id);
    });

    // question id (key) and response (value) pairs
    for (const key of Object.keys(this.props.responses)) {
      data.append(key, this.props.responses[key]);
    }

    
    for (let entry of data.entries()) {
      console.log(entry);
    }
    postRequest(url, data, response => {
      console.log('its liit');
      console.log(response);
      this.props.dispatch(setRegisteredVolunteer(response.volunteer));
      this.props.history.push('/Done');
    });
  }

  setGeneralInformation = (name, value) => {
    this.props.dispatch(setGeneralInformation(name, value));
  }

  setResponseParent = (name, value) => {
    this.props.dispatch(setResponse(name, value));
  }

  render() {
    return (
      <div className="container">
        <Header />
        <form onSubmit={this.submitButtonPressed}>
          <GeneralInformation general_information={this.props.general_information} setGeneralInformation={this.setGeneralInformation} />
          <SurveyList responses={this.props.responses} setResponseParent={this.setResponseParent} surveys={this.props.surveys} />
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
    responses: state.responses,
    general_information: state.general_information,
    registered_volunteer: state.registered_volunteer
  }
}


export default connect(mapStateToProps)(SurveyPage);