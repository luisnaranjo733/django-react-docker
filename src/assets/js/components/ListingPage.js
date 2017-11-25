import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { setOpportunityPreferences, setOpportunities } from '../redux'

import 'whatwg-fetch'
import $ from "jquery";

import { getListingsEndpoint } from '../utils'

import '../css/listing.css';

const Header = () => (
  <header>
    <h1>Volunteer opportunities!</h1>

    <div className="divider"></div>

    <div className="card purple lighten-5">
      <div className="card-content black-text">
        <p>To help us manage our growing number of volunteers, we ask that potential new volunteers follow this process:</p>
        <ol>
          <li>Read the description for each volunteer opportunity</li>
          <li>Select which volunteer opportunities you would like to get involved with</li>
          <li>Fill out a quick survey with your contact info and some background questions to help us place you</li>
          <li>Sit tight and wait for our volunteer managers to reach out to you (typically within X business days)</li>
        </ol>

        <p>Alternatively, if you need to reach out to one of our volunteer coordinators directly, you can find their names and contact information <a href="{% url 'manager-contacts' %}">here</a>.</p>
      </div>
    </div>
  </header>
);

const OpportunityDescription = ({ opportunity }) => (
  <div>
    <h3>{opportunity.name}</h3>
    <div className="divider"></div>

    <p>{opportunity.desc}</p>
  </div>
);

class OpportunityDescriptionList extends Component {

  render() {
    console.log(this.props.opportunities);
    return (
      <div className="section">
        <h2>Step 1: Read about available opportunities</h2>
        <div className="indent">
          {this.props.opportunities.map((opportunity, index) => (
            <OpportunityDescription key={index} opportunity={opportunity} />
          ))}
        </div>

      </div>
    )

  }
}

const ActionableOpportunity = (props) => (
  <a className="waves-effect waves-light btn-flat grey lighten-2 action-btn" data-modal-id="{{ opportunity.id }}"
    href={props.opportunity.action_link}>
    <span className="black-text">{props.opportunity.name}</span>
  </a>
);

const SurveyableOpportunity = (props) => (
  <p>
    <input type="checkbox" name="categories[]" value={"o" + props.opportunity.id} id={"o" + props.opportunity.id} />
    <label htmlFor={"o" + props.opportunity.id}>{props.opportunity.name}</label>
  </p>
);

class OpportunityInterestList extends Component {
  render() {
    let surveyable_opportunities = this.props.opportunities.filter(opportunity => opportunity.opportunity_type == 'Survey-able');
    let actionable_opportunities = this.props.opportunities.filter(opportunity => opportunity.opportunity_type == 'Action-able');

    return (
      <div className="section">
        <h2>Step 2: Select your interest</h2>
        <div className="indent">
          {surveyable_opportunities.map((opportunity, index) => (
            <SurveyableOpportunity key={index} opportunity={opportunity} />
          ))}
          {actionable_opportunities.map((opportunity, index) => (
            <ActionableOpportunity key={index} opportunity={opportunity} />
          ))}

          <br />
          <button className="btn waves-effect waves-light" onClick={this.props.buttonPressed}>Proceed to step 3
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    );
  }
}

class ListingPage extends Component {
  constructor() {
    super();
    this.state = {
      opportunities: []
    }
  }

  componentDidMount() {
    // fetch opportunities from backend via api
    
    let outerThis = this;
    fetch(getListingsEndpoint())
      .then(function (response) {
        return response.text();
      })
      .then(function (opportunities) {
        opportunities = JSON.parse(opportunities);

        // then set them in state
        outerThis.props.dispatch(setOpportunities(opportunities));
      });
  }

  buttonPressed = () => {
    let preferences = [];
    this.props.opportunities.forEach(opportunity => {
      let is_opportunity_checked = $(`#o${opportunity.id}`).is(":checked");
      if (is_opportunity_checked) {
        preferences.push(opportunity.id);
      }
    });
    this.props.dispatch(setOpportunityPreferences(preferences));
    this.props.history.push('/Survey');
  }

  render() {
    return (
      <div className="container">
        <Header />
        <OpportunityDescriptionList opportunities={this.props.opportunities} />
        <OpportunityInterestList opportunities={this.props.opportunities} buttonPressed={this.buttonPressed} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    opportunities: state.opportunities,
    opportunity_preference_ids: state.opportunity_preference_ids,
  }
}


export default connect(mapStateToProps)(ListingPage);