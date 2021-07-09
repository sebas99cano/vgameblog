import favoritesReducer from "./favoritesReducer";
import publicationReducer from "./publicationReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    favorites: favoritesReducer,
    publication: publicationReducer
})

export default rootReducer;