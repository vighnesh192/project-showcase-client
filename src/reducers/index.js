import { combineReducers } from "redux";
import accountReducer from "./accountReducers";

const allReducers = combineReducers({
    account: accountReducer
});

export default allReducers;