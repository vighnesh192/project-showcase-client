import { combineReducers } from "redux";
import accountReducer from "./accountReducers";
import projectReducers from "./projectReducers";

const allReducers = combineReducers({
    account: accountReducer,
    projects: projectReducers
});

export default allReducers;