import {
    ADD_FAVORITES_PUBLICATION,
    DELETE_FAVORITES_PUBLICATION, ERROR_F, IS_FAVORITE, LOAD_FAVORITES_PUBLICATION, LOADING_F
} from "../types/types";

const initState = {
    publications: [],
    user:'',
    loading: false,
    error: '',
    is:false
}

const favoritesReducer = (state = initState, action) => {

    switch (action.type) {
        case ADD_FAVORITES_PUBLICATION:
            return {...state, publications: [...state.publications,action.payload],user: action.payload.userId ,loading: false, error: ''}
        case LOAD_FAVORITES_PUBLICATION:
            return {...state, publications: action.payload.publications,user: action.payload.userId ,loading: false, error: ''}
        case IS_FAVORITE:
            return {...state, is: action.payload}
        case DELETE_FAVORITES_PUBLICATION:
            let favorites = state.publications.filter((pub) => pub.id !== action.payload)
            return {...state, publications: favorites}
        case LOADING_F:
            return {...state, loading: true};
        case ERROR_F:
            return {...state, error: action.payload, loading: false};
        default:
            return state;
    }
}

export default favoritesReducer;