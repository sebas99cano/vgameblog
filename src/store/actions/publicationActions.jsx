import {LOAD_PUBLICATIONS, LOADING, ERROR} from "../types/publicationTypes";
import {db} from "../../services/firebase";

export const createPublication = (publication) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    try {
        await db.ref("publications").push({
            ...publication
        });
        dispatch({
            type: 'CREATE_PUBLICATION',
            publication: publication
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "posts could not be saved"
        });
    }
};

export const receivePublications = () => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    try {
        await db.ref("publications").on("value", snapshot => {
            let publications = [];
            snapshot.forEach((snap) => {
                publications.push(snap.val());
            });
            dispatch({
                type: LOAD_PUBLICATIONS,
                payload: publications
            });
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: "posts could not be loaded"
        });
    }
}





