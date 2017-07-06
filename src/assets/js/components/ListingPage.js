import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { setOpportunityPreferences, setOpportunities } from '../redux'

import 'whatwg-fetch'
import $ from "jquery";

import '../css/listing.css';

let OPPORTUNITIES = [
  {
    id: 1,
    type: 'survey-able',
    title: 'Take a pro bono case',
    description: "NWIRP directly represents many clients in legal proceedings, but the demand for services is greater than our staff can address. A client's chance of avoiding removal from the U.S. is highly dependent on whether or not he or she has legal representation. As a result, NWIRP places great emphasis on training others, in order to stretch its resources as far as they can go. One of NWIRP's great successes is our pro bono panel of attorneys, who are instrumental in sharing the workload of directly representing immigrants. Over 300 attorneys participate in NWIRP's pro bono program. These attorneys make a profound difference in the lives of their clients and have found the pro bono experience to be deeply rewarding for them as well. Without the hard work of this dedicated group, scores of individuals would be lost in an overwhelming bureaucracy and subject to removal from the country, separation from their family, and often a life of poverty and fear. If you or someone you know is in the legal profession and might be able to assist in taking a pro-bono case, please contact:"
  },
  {
    id: 2,
    type: 'survey-able',
    title: 'Juvenile Immigration Cases & Family Law Cases',
    description: "We seek Spanish-speaking volunteers to help with children's immigration cases, prepare Special Immigrant Juvenile Status petitions and work on Juvenile State Court & Family Law cases. Law students or attorneys preferred, but above all a willingness to learn is our number one requirement.",
  },
  {
    id: 3,
    type: 'survey-able',
    title: 'General Intake volunteers',
    description: "This opportunity is intended for college graduates with plans to attend law school, as well law students and law school graduates. NWIRP needs your help conducting initial in-person or phone interviews to potential clients on our waiting list for immigration legal services. We welcome speakers of all languages, although our most urgent need is for Spanish-speaking volunteers. For this unpaid volunteer opportunity, we seek people able to commit for a minimum of ten weeks, full time. If you are unable to commit for this period, we will be happy to hear about your availability. This volunteer opportunity requires computer literacy, typing proficiency and the ability to use an office telephone for long periods of time.",
  },
  {
    id: 4,
    type: 'survey-able',
    title: 'Volunteer Translators / Interpreters',
    description: "If you are multilingual and would like to volunteer to help NWIRP serve people who have immigrated to Washington from over 100 countries worldwide, we would love to hear from you! Please click here to send us your contact information, the details of the languages you speak/write and your availability, etc. We seek volunteers who can both interpret conversations with clients and translate written materials. Please note: Your name will be added to the list but you will not be contacted directly until NWIRP staff have a need for translation or interpretation in the language you offer. We prioritize volunteers who do not charge for their services.",
  },
  {
    id: 5,
    type: 'action-able',
    title: 'Become a raid representative',
    description: "Become a raid representative! It will help us out a lot.",
    url: 'http://www.google.com'
  },

]

const Header = () => (
  <header>
    <h1>Volunteer opportunities</h1>

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
    <input type="checkbox" name="categories[]" value={"o"+props.opportunity.id} id={"o"+props.opportunity.id} />
    <label htmlFor={"o"+props.opportunity.id}>{props.opportunity.name}</label>
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
    let url = 'http://ec2-54-218-9-42.us-west-2.compute.amazonaws.com/api/opportunities/?format=json';

    let outerThis = this;
    fetch(url)
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