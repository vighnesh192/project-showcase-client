const initialState = {
    users: undefined,
    profile: undefined
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setTopCreators':
            state = {
                users: action.payload.data
            }
            return state;
        
        case 'setUserProfile':
            console.log('IN PROFILE REDUCER')
            state = {
                profile: action.payload.data
            }
            return state;
    
        default:
            return state;
    }
}

export default userReducer;