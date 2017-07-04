import React, { Component } from 'react';
import '../css/listing.css';

const Header = () => (
  <h1>ListingPage</h1>
);

const OpportunityDescription = ({opportunity}) => (
  <p>This is an opportunity: { opportunity }</p>
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
    this.state = {
      opportunities: [
        1,2,3
      ]
    }
    // fetch opportunities from backend via api
    // then set them in state
  }

  render() {
    return (
      <div>
        <Header />
        <OpportunityDescriptionList opportunities={this.state.opportunities} />
        <OpportunityInterestList />
      </div>
    );
  }
}

export default ListingPage;