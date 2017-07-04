import React, { Component } from 'react';
import '../css/listing.css';

let OPPORTUNITIES = [
  {
    title: 'Take a pro bono case',
    description: "NWIRP directly represents many clients in legal proceedings, but the demand for services is greater than our staff can address. A client's chance of avoiding removal from the U.S. is highly dependent on whether or not he or she has legal representation. As a result, NWIRP places great emphasis on training others, in order to stretch its resources as far as they can go. One of NWIRP's great successes is our pro bono panel of attorneys, who are instrumental in sharing the workload of directly representing immigrants. Over 300 attorneys participate in NWIRP's pro bono program. These attorneys make a profound difference in the lives of their clients and have found the pro bono experience to be deeply rewarding for them as well. Without the hard work of this dedicated group, scores of individuals would be lost in an overwhelming bureaucracy and subject to removal from the country, separation from their family, and often a life of poverty and fear. If you or someone you know is in the legal profession and might be able to assist in taking a pro-bono case, please contact:"
  },
  {
    title: 'Juvenile Immigration Cases & Family Law Cases',
    description: "We seek Spanish-speaking volunteers to help with children's immigration cases, prepare Special Immigrant Juvenile Status petitions and work on Juvenile State Court & Family Law cases. Law students or attorneys preferred, but above all a willingness to learn is our number one requirement.",
  },
  {
    title: 'General Intake volunteers',
    description: "This opportunity is intended for college graduates with plans to attend law school, as well law students and law school graduates. NWIRP needs your help conducting initial in-person or phone interviews to potential clients on our waiting list for immigration legal services. We welcome speakers of all languages, although our most urgent need is for Spanish-speaking volunteers. For this unpaid volunteer opportunity, we seek people able to commit for a minimum of ten weeks, full time. If you are unable to commit for this period, we will be happy to hear about your availability. This volunteer opportunity requires computer literacy, typing proficiency and the ability to use an office telephone for long periods of time.",
  },
  {
    title: 'Volunteer Translators / Interpreters',
    description: "If you are multilingual and would like to volunteer to help NWIRP serve people who have immigrated to Washington from over 100 countries worldwide, we would love to hear from you! Please click here to send us your contact information, the details of the languages you speak/write and your availability, etc. We seek volunteers who can both interpret conversations with clients and translate written materials. Please note: Your name will be added to the list but you will not be contacted directly until NWIRP staff have a need for translation or interpretation in the language you offer. We prioritize volunteers who do not charge for their services.",
  },
  {
    title: 'Become a raid representative',
    description: "Become a raid representative! It will help us out a lot.",
  },

]

const Header = () => (
  <h1>Header</h1>
);

const OpportunityDescription = ({ opportunity }) => (
  <div>
    <h2>{opportunity.title}</h2>
    <p>{opportunity.description}</p>
  </div>
);

class OpportunityDescriptionList extends Component {
  render() {
    console.log(this.props.opportunities);
    return (
      <div>
        <p>Here is the list of opportunities</p>
        {this.props.opportunities.map((opportunity, index) => (
          <OpportunityDescription key={index} opportunity={opportunity} />
        ))}
      </div>
    )

  }
}


class OpportunityInterestList extends Component {
  render() {
    return <p>LIst of OpportunityInterestList</p>
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

  render() {
    return (
      <div>
        <Header />
        <OpportunityDescriptionList opportunities={this.state.opportunities} />
        <OpportunityInterestList opportunities={this.state.opportunities} />
      </div>
    );
  }
}

export default ListingPage;