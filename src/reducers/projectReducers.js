const initialState = {
    projects: undefined,
    queryType: 'popular',
    projectDetails: undefined
};

const projectReducer = (state = initialState, action) => {
    const { projects, queryType, projectDetails } = action.payload;
    switch (action.type) {
        case 'SET':
            state = { projects, queryType };
            console.log('PROJECT STATE' ,state);
            return state;
        
        case 'SET_PROJECT_DETAILS':
            state = { projects, queryType, projectDetails };
            console.log('PROJECT_DETAILS_REDUCER:-', state);
            return state;

        default:
            return state;
    }
}

export default projectReducer;