import {combineReducers} from "redux";
import showAddItem from "./showAddItem.js";

const allReducers = combineReducers({
    showAddItem,
});

export default allReducers;