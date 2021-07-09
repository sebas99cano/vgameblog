import {LOAD_PUBLICATIONS, LOADING, ERROR} from "../types/publicationTypes";

const initState = {
    publications: [],
    loading: false,
    error: ''
}

const publicationReducer = (state = initState, action) => {

    switch (action.type) {
        case LOAD_PUBLICATIONS:
            console.log("aqui 3")
            return {...state, publications: action.payload, loading: false, error: ''}
        case LOADING:
            return {...state, loading: true};
        case ERROR:
            return {...state, error: action.payload, loading: false};
        default:
            return state;
    }
}

export default publicationReducer;