import {LOAD_PUBLICATIONS, LOADING, ERROR, DELETE_PUBLICATION} from "../types/publicationTypes";
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

export const deletePublication = (publication) => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    try {
        let ref = null;
        await db.ref("publications").on("value", snapshot => {
            snapshot.forEach((snap) => {
                if (snap.val().id === publication.id) {
                    ref = snap;
                }
            });
        });
        ref = (db.ref("publications").child(ref.key))
        await ref.remove();
        dispatch({
            type: DELETE_PUBLICATION,
            payload: publication.id
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR,
            payload: "posts could not be removed"
        });
    }
}




