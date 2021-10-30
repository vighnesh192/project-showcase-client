const initialState = {
    users: undefined,
    profile: undefined
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setTopCreators':
            return {
                ...state,
                users: action.payload.data
            }
        
        case 'setUserProfile':
            console.log('IN PROFILE REDUCER')
            return {
                ...state,
                profile: action.payload.data
            }
    
        default:
            return {
                ...state
            }
    }
}

export default userReducer;