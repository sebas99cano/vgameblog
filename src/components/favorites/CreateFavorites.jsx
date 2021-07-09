import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {auth} from "../../services/firebase";
import {deletePublication} from "../../store/actions/publicationActions";
import {deleteFavoritePublication, loadFavorites} from "../../store/actions/favoritestActions";

export const CreateFavorites = () => {
    const dispatch = useDispatch();
    const publications = useSelector((state => state.publication.publications))
    const favorites = useSelector((state => state.favorites.publications))

    useEffect(()=>{

        dispatch(loadFavorites(auth().currentUser.uid))
        if(favorites.length>10){
        }
    },[dispatch])

    return (

        <div>
            {favorites.map((favorite) =>(
                    <div key={favorite.id}>
                        <FavoriteSummary dispatch={dispatch} favorite={favorite}/>
                        <br/>
                    </div>
                ))}
        </div>
    )
}

export const FavoriteSummary = ({dispatch, favorite}) =>{

    const deleteSubmit = () => {
        dispatch(deletePublication(favorite))
    }

    const disaggregateSubmit = () => {
        dispatch(deleteFavoritePublication(favorite))
    }

    return(
        <div className="card border border-radius rounded border-dark" key={favorite.id}>
            <div className="card-body">
                <h5 className="card-title">{favorite.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{favorite.userName}</h6>
                <p className="card-text">{favorite.content}</p>
                    <button className={"btn btn-secondary mr-1 px-5"} onClick={disaggregateSubmit}>disaggregate <i
                        className="bi bi-plus-square"/></button>
                {(auth().currentUser.uid === favorite.user) ?
                    <button className={"btn btn-danger mr-1 px-5"} onClick={deleteSubmit}>Delete <i
                        className="bi bi-trash"/>
                    </button> : ""}
            </div>
        </div>
    )

}