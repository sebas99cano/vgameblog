import React from "react";

const PublicationSummary = ({publication}) => {
    return (
        <div className="card" key={publication.id}>
            <div className="card-body">
                <h5 className="card-title">{publication.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{publication.userName}</h6>
                <p className="card-text">{publication.content}</p>
                <button className={"btn btn-success mr-1"}>Favoritos</button>
                <button className={"btn btn-danger"}>Eliminar</button>
            </div>
        </div>
    )
}

export const Publication = ({publications}) => {

    return (
        <div>
            {publications && publications.map(publication => {
                return (
                    <div key={publication.id.toString()}>
                        <PublicationSummary publication={publication} />
                        <br/>
                    </div>
                )
            })}
        </div>
    )
}