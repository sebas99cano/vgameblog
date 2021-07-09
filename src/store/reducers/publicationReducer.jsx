import {LOAD_PUBLICATIONS, LOADING, ERROR, DELETE_PUBLICATION} from "../types/publicationTypes";

const initState = {
    publications: [],
    loading: false,
    error: ''
}

const publicationReducer = (state = initState, action) => {

    switch (action.type) {
        case LOAD_PUBLICATIONS:
            return {...state, publications: action.payload, loading: false, error: ''}
        case DELETE_PUBLICATION:
            let publications = state.publications.filter((pub) => pub.id !== action.payload)
            return {...state, publications: publications}
        case LOADING:
            return {...state, loading: true};
        case ERROR:
            return {...state, error: action.payload, loading: false};
        default:
            return state;
    }
}

export default publicationReducer;