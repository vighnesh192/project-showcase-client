const initialState = {
    projects: undefined,
    queryType: 'popular'
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            state = {
                projects: action.payload.projects,
                queryType: action.payload.queryType
            };
            console.log('PROJECT STATE' ,state);
            return state;
    
        default:
            return state;
    }
}

export default projectReducer;