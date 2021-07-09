import React from "react";
import {auth} from "../../services/firebase";
import {deletePublication} from "../../store/actions/publicationActions";
import {useDispatch} from "react-redux";
import {addFavorite, deleteFavoritePublication} from "../../store/actions/favoritestActions";
import {logout} from "../../helpers/auth";

const PublicationSummary = ({publication, dispatch, favorites}) => {

    const isFavorite = () => {
        let is = false
        favorites.forEach((pub) => {
            if (pub.id === publication.id) {
                is = true;
            }
        })
        return is;
    }

    const deleteSubmit = () => {
        dispatch(deletePublication(publication))
    }

    const addSubmit = () => {
        dispatch(addFavorite(publication, auth().currentUser.uid))
    }

    const disaggregateSubmit = () =>{
        dispatch(deleteFavoritePublication(publication))
    }

    return (
        <div className="card border border-radius rounded border-dark" key={publication.id}>
            <div className="card-body">
                <h5 className="card-title">{publication.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{publication.userName}</h6>
                <p className="card-text">{publication.content}</p>
                {(isFavorite()) ? <button className={"btn btn-secondary mr-1 px-5"} onClick={disaggregateSubmit}>disaggregate <i
                        className="bi bi-plus-square"/></button>
                    : <button className={"btn btn-success mr-1 px-5"} onClick={addSubmit}>Add <i
                        className="bi bi-plus-square"/></button>}
                {(auth().currentUser.uid === publication.user) ?
                    <button className={"btn btn-danger mr-1 px-5"} onClick={deleteSubmit}>Delete <i
                        className="bi bi-trash"/>
                    </button> : ""}
            </div>
        </div>
    )
}

export const Publication = ({publications, favorites}) => {

    const dispatch = useDispatch();

    return (
        <div>
            {publications && publications.map(publication => {
                return (

                    <div >
                        {console.log(publication)}
                        <PublicationSummary publication={publication} dispatch={dispatch} favorites={favorites}/>
                        <br/>
                    </div>
                )
            })}
        </div>
    )
}