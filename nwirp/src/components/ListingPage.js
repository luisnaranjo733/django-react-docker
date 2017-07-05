import React, { Component } from 'react';
import '../css/listing.css';

let OPPORTUNITIES = [
  {
    type: 'survey-able',
    title: 'Take a pro bono case',
    description: "NWIRP directly represents many clients in legal proceedings, but the demand for services is greater than our staff can address. A client's chance of avoiding removal from the U.S. is highly dependent on whether or not he or she has legal representation. As a result, NWIRP places great emphasis on training others, in order to stretch its resources as far as they can go. One of NWIRP's great successes is our pro bono panel of attorneys, who are instrumental in sharing the workload of directly representing immigrants. Over 300 attorneys participate in NWIRP's pro bono program. These attorneys make a profound difference in the lives of their clients and have found the pro bono experience to be deeply rewarding for them as well. Without the hard work of this dedicated group, scores of individuals would be lost in an overwhelming bureaucracy and subject to removal from the country, separation from their family, and often a life of poverty and fear. If you or someone you know is in the legal profession and might be able to assist in taking a pro-bono case, please contact:"
  },
  {
    type: 'survey-able',
    title: 'Juvenile Immigration Cases & Family Law Cases',
    description: "We seek Spanish-speaking volunteers to help with children's immigration cases, prepare Special Immigrant Juvenile Status petitions and work on Juvenile State Court & Family Law cases. Law students or attorneys preferred, but above all a willingness to learn is our number one requirement.",
  },
  {
    type: 'survey-able',
    title: 'General Intake volunteers',
    description: "This opportunity is intended for college graduates with plans to attend law school, as well law students and law school graduates. NWIRP needs your help conducting initial in-person or phone interviews to potential clients on our waiting list for immigration legal services. We welcome speakers of all languages, although our most urgent need is for Spanish-speaking volunteers. For this unpaid volunteer opportunity, we seek people able to commit for a minimum of ten weeks, full time. If you are unable to commit for this period, we will be happy to hear about your availability. This volunteer opportunity requires computer literacy, typing proficiency and the ability to use an office telephone for long periods of time.",
  },
  {
    type: 'survey-able',
    title: 'Volunteer Translators / Interpreters',
    description: "If you are multilingual and would like to volunteer to help NWIRP serve people who have immigrated to Washington from over 100 countries worldwide, we would love to hear from you! Please click here to send us your contact information, the details of the languages you speak/write and your availability, etc. We seek volunteers who can both interpret conversations with clients and translate written materials. Please note: Your name will be added to the list but you will not be contacted directly until NWIRP staff have a need for translation or interpretation in the language you offer. We prioritize volunteers who do not charge for their services.",
  },
  {
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
    <h3>{opportunity.title}</h3>
    <div className="divider"></div>

    <p>{opportunity.description}</p>
  </div>
);

class OpportunityDescriptionList extends Component {

  render() {
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

function OpportunityInterestItem(props) {
  if (props.opportunity.type == 'survey-able') {
    return (
      <p>
        <input type="checkbox" name="categories[]" value="{{ opportunity.id }}" id="{{ opportunity.id }}" />
        <label htmlFor="{{ opportunity.id }}">{props.opportunity.title}</label>
      </p>
    );
  } else if (props.opportunity.type == 'action-able') {
    return (
      <button className="waves-effect waves-light btn-flat grey lighten-2 action-btn" data-modal-id="{{ opportunity.id }}">
        <span className="black-text">{props.opportunity.title}</span>
      </button>
    );
  } else {

  }
}

const ActionableOpportunity = (props) => (
  <a className="waves-effect waves-light btn-flat grey lighten-2 action-btn" data-modal-id="{{ opportunity.id }}"
    href={props.opportunity.url}>
    <span className="black-text">{props.opportunity.title}</span>
  </a>
);

const SurveyableOpportunity = (props) => (
  <p>
    <input type="checkbox" name="categories[]" value="{{ opportunity.id }}" id="{{ opportunity.id }}" />
    <label htmlFor="{{ opportunity.id }}">{props.opportunity.title}</label>
  </p>
);


class OpportunityInterestList extends Component {
  render() {
    let surveyable_opportunities = this.props.opportunities.filter(opportunity => opportunity.type == 'survey-able');
    let actionable_opportunities = this.props.opportunities.filter(opportunity => opportunity.type == 'action-able');

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
  }

  componentWillMount() {
    // TODO:
    // fetch opportunities from backend via api
    // then set them in state
    this.state = {
      opportunities: OPPORTUNITIES
    }
  }

  buttonPressed = () => {

  }

  render() {
    return (
      <div className="container">
        <Header />
        <OpportunityDescriptionList opportunities={this.state.opportunities} />
        <OpportunityInterestList opportunities={this.state.opportunities} buttonPressed={this.buttonPressed}/>
      </div>
    );
  }
}

export default ListingPage;