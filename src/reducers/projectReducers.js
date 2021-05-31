const initialState = {
    projects: undefined,
    queryType: 'popular',
    projectDetails: undefined
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            state = { 
                projects: action.payload.projects,
                queryType: action.payload.queryType 
            };
            return state;
        
        case 'SET_PROJECT_DETAILS':
            console.log('SET_PROJECT_DETAILS ACTION', action)
            state = { 
                projects: action.payload.projects,
                queryType: action.payload.queryType,
                projectDetails: action.payload.projectDetails
            };
            return state;

        default:
            return state;
    }
}

export default projectReducer;