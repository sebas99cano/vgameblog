import React, {Component} from "react";
import {Game} from "./Game";
import {Publication} from "./publication/Publication";
import {connect} from "react-redux";
import CreatePublication from "./publication/createPublication";
import {receivePublications} from "../store/actions/publicationActions";
import {loadFavorites} from "../store/actions/favoritestActions";
import {auth} from "../services/firebase";

class Dashboard extends Component {

     async componentDidMount() {
         this.props.receivePublications();
         this.props.loadFavorites();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Game/>
                    </div>
                    <div className="col-md-8">
                        <CreatePublication/>
                        <Publication />
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

export default connect(null,mapDispatchToProps)(Dashboard);