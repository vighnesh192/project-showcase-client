const initialState = {
    projects: undefined
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET':
            state = {
                projects: action.payload
            };
            console.log('PROJECT STATE' ,state);
            return state;
    
        default:
            return state;
    }
}

export default projectReducer;