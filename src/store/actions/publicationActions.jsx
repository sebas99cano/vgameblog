import {LOAD_PUBLICATIONS, ERROR, DELETE_PUBLICATION, CREATE_PUBLICATIONS} from "../types/types";
import {db} from "../../services/firebase";

export const createPublication = (publication) => async (dispatch) => {
    try {
        await db.ref("publications").push({
                ...publication
            },);
        dispatch({
            type: CREATE_PUBLICATIONS,
            payload: publication
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR,
            payload: "posts could not be saved"
        });
    }
};

export const receivePublications = () => async (dispatch) => {
    try {
        await db.ref("publications").on("value", snapshot => {
            let publications = [];
            snapshot.forEach((snap) => {
                publications.push(snap.val());
            });
            publications.sort(function (a, b) {
                return b.timestamp - a.timestamp
            })
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
    try {
        let ref = null;
        await db.ref("publications").on("value", snapshot => {
            snapshot.forEach((snap) => {
                if (snap.val().id === publication.id) {
                    ref = snap;
                }
            });
            ref = (db.ref("publications").child(ref.key))
            ref.remove();
            dispatch({
                type: DELETE_PUBLICATION,
                payload: publication.id
            });
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR,
            payload: "posts could not be removed"
        });
    }
}




