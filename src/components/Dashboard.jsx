import React, {Component} from "react";
import {Game} from "./Game";
import {Publication} from "./Publication";
import {connect} from "react-redux";
import CreatePublication from "./createPublication";
import {receivePublications} from "../store/actions/publicationActions";



class Dashboard extends Component {

     async componentDidMount() {
         this.props.receivePublications()
    }
    render() {
        const {publications} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Game/>
                    </div>
                    <div className="col-md-8">
                        <CreatePublication/>
                        <Publication publications={publications}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        publications: state.publication.publications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        receivePublications: () => dispatch(receivePublications())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);