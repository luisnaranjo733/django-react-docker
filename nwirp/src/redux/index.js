// actions

export const setOpportunities = opportunities => {
    return {
        type: 'SET_OPPORTUNITIES',
        opportunities
    }
}

export const setOpportunityPreferences = opportunity_preference_ids => {
    return {
        type: 'SET_OPPORTUNITY_PREFERENCE_IDS',
        opportunity_preference_ids
    }
}


// reducers

let initialState = {
    opportunities: [],
    opportunity_preference_ids: []
};

const reducer = (state = initialState, action) => {
    let new_state = Object.assign({}, state);
    switch (action.type) {
        case 'SET_OPPORTUNITIES':
            new_state.opportunities = action.opportunities;
            return new_state;
        case 'SET_OPPORTUNITY_PREFERENCE_IDS':
            new_state.opportunity_preference_ids = action.opportunity_preference_ids;
            return new_state;
        default:
            return state
    }
}

export default reducer;