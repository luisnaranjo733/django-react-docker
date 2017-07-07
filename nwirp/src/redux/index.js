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

export const setSurveys = surveys => {
    return {
        type: 'SET_SURVEYS',
        surveys
    }
}

export const setResponse = (name, value) => {
    return {
        type: 'SET_RESPONSE',
        name,
        value
    }
}


// reducers

let initialState = {
    opportunities: [],
    opportunity_preference_ids: [],
    surveys: [],
    responses: {
        volunteer_name: '',
        volunteer_email: '',
        volunteer_phone: ''
    }
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
        case 'SET_SURVEYS':
            new_state.surveys = action.surveys;
            return new_state;
        case 'SET_RESPONSE':
            new_state.responses[action.name] = action.value;
            return new_state;
        default:
            return state
    }
}

export default reducer;