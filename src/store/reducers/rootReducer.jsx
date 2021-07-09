import commentReducer from "./commentReducer";
import publicationReducer from "./publicationReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    comment: commentReducer,
    publication: publicationReducer
})

export default rootReducer;