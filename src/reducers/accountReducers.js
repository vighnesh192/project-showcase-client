const initialState = {
    user: undefined,
    loggedIn: undefined
};

const accountReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOGIN":
            state = {
                user: action.payload,
                loggedIn: true
            }
            localStorage.setItem('User', JSON.stringify(action.payload));
            return state;
        case "LOGOUT":
            state = {
                user: undefined,
                loggedIn: false
            }
            localStorage.removeItem('User');
            return state;
        default:
            return state;
    }
}

export default accountReducer;