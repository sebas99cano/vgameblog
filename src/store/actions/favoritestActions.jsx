import {
    ADD_FAVORITES_PUBLICATION, DELETE_FAVORITES_PUBLICATION,
    ERROR_F,
    LOAD_FAVORITES_PUBLICATION
} from "../types/types";
import {db} from "../../services/firebase";

export const addFavorite = (publication, userId) => async (dispatch) => {

    try {
        await db.ref("favorites").push({
            publicationId: publication.id,
            userId: userId
        });
        dispatch({
            type: ADD_FAVORITES_PUBLICATION,
            payload: {
                publication: publication,
                userId: userId
            }
        });
    } catch (error) {
        dispatch({
            type: ERROR_F,
            payload: "posts could not be saved as favorite"
        });
    }
};

export const loadFavorites = (userId) => async (dispatch) => {

    try {
        let ref_id_publications = [];
        await db.ref("favorites").on("value", snapshot => {
            snapshot.forEach((snap) => {
                if (snap.val().userId === userId) {
                    ref_id_publications.push(snap.val().publicationId);
                }
            });
            let publications = [];
            db.ref("publications").on("value", snapshot => {
                snapshot.forEach((snap) => {
                        ref_id_publications.forEach((id) => {
                            if (snap.val().id === id) {
                                publications.push(snap.val())
                            }
                        })
                    }
                );
            });
            dispatch({
                type: LOAD_FAVORITES_PUBLICATION,
                payload: {
                    publications: publications,
                    userId: userId
                }
            })
        });
    } catch (error) {
        dispatch({
            type: ERROR_F,
            payload: "posts could not be saved as favorite"
        });
    }
}

export const deleteFavoritePublication = (publication) => async (dispatch) => {
    try {
        let ref = null;
        await db.ref("favorites").on("value", snapshot => {
            snapshot.forEach((snap) => {
                if (snap.val().publicationId === publication.id) {
                    ref = snap;
                }
            });
            ref = (db.ref("favorites").child(ref.key))
            ref.remove();
            dispatch({
                type: DELETE_FAVORITES_PUBLICATION,
                payload: publication.id
            });
        });

    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR_F,
            payload: "favorite could not be removed"
        });
    }
}