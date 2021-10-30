const initialState = {
    user: undefined,
    loggedIn: undefined
};

const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            localStorage.setItem('User', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case "LOGOUT":
            localStorage.removeItem('User');
            return {
                ...state,
                user: undefined,
                loggedIn: false
            }
        default:
            return {
                ...state
            }
    }
}

export default accountReducer;