// actions

export const setOpportunityPreferences = opportunity_ids => {
    return {
        type: 'SET_OPPORTUNITY_PREFERENCE_IDS',
        opportunity_ids
    }
}


// reducers

let initialState = {
    opportunity_preference_ids: []
};

const reducer = (state = initialState, action) => {
    let new_opportunity_preference_ids = Object.assign([], state.opportunity_preference_ids);
    switch (action.type) {
        case 'SET_OPPORTUNITY_PREFERENCE_IDS':
            return {
                opportunity_preference_ids: action.opportunity_ids
            };
        default:
            return state
    }
}

export default reducer;