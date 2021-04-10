const initialState = {
    user: undefined,
    loggedIn: undefined
};

const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            state = {
                user: undefined,
                loggedIn: true
            }
            return state;
        case "LOGOUT":
            state = {
                user: undefined,
                loggedIn: false
            }
            return state;
        default:
            return state;
    }
}

export default accountReducer;