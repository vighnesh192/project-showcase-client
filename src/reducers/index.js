import { combineReducers } from "redux";
import accountReducer from "./accountReducers";
import projectReducers from "./projectReducers";
import userReducer from "./userReducer";

const allReducers = combineReducers({
    account: accountReducer,
    projects: projectReducers,
    users: userReducer
});

export default allReducers;