const initialState = {
    projects: undefined,
    queryType: 'popular',
    projectDetails: undefined
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                projects: action.payload.projects,
                queryType: action.payload.queryType
            }
        
        case 'SET_PROJECT_DETAILS':
            return {
                ...state,
                projects: action.payload.projects,
                queryType: action.payload.queryType,
                projectDetails: action.payload.projectDetails
            }

        case 'POST_COMMENT_SUCCESS':
            return {
                ...state,
                projectDetails: {
                    ...state.projectDetails,
                    comments: [...state.projectDetails.comments, action.payload]
                }
            }

        default:
            return {
                ...state
            };
    }
}

export default projectReducer;