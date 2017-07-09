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

export const setGeneralInformation = (name, value) => {
    return {
        type: 'SET_GENERAL_INFORMATION',
        name,
        value
    }
}

export const setRegisteredVolunteer = registered_volunteer => {
    return {
        type: 'SET_REGISTERED_VOLUNTEER',
        registered_volunteer
    }
}


// reducers

let initialState = {
    opportunities: [],
    opportunity_preference_ids: [],
    surveys: [],
    responses: {},
    general_information: {
        volunteer_name: 'Luis Naranjo',
        volunteer_email: 'luisnaranjo733@gmail.com',
        volunteer_phone: '206-478-4652'
    },
    registered_volunteer: {}
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
        case 'SET_GENERAL_INFORMATION':
            new_state.general_information[action.name] = action.value;
            return new_state;
        case 'SET_REGISTERED_VOLUNTEER':
            new_state.registered_volunteer = action.registered_volunteer
            return new_state;
        default:
            return state
    }
}

export default reducer;