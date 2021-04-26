const initialState = {
    users: undefined
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setTopCreators':
            console.log('ACTION', action);
            state = {
                users: action.payload.data
            }
            return state;
    
        default:
            return state;
    }
}

export default userReducer;