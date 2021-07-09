import React, {Component} from "react";
import {loadFavorites} from "../../store/actions/favoritestActions";
import {auth} from "../../services/firebase";
import {connect} from "react-redux";
import {CreateFavorites} from "./CreateFavorites";
import {receivePublications} from "../../store/actions/publicationActions";

class Favorites extends Component{

    async componentDidMount() {
        this.props.receivePublications();
        this.props.loadFavorites();
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-3"/>
                    <div className="col-md-6">
                        <h1 className="cover-heading mt-5 font-weight-bold text-center">here you will find all your saved posts. <i
                            className="bi bi-controller" /></h1>
                            <CreateFavorites/>
                    </div>
                </div>
            </div>
        )
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        receivePublications: () => dispatch(receivePublications()),
        loadFavorites: () => dispatch(loadFavorites(auth().currentUser.uid))
    }
}

export default connect(null,mapDispatchToProps)(Favorites);
