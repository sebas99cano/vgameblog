import authReducer from "./authReducer";
import publicationReducer from "./publicationReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    publication: publicationReducer
})

export default rootReducer;