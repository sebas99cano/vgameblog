import React, {Component} from "react";
import {createPublication} from "../store/actions/publicationActions";
import {connect} from "react-redux";
import {auth, db} from "../services/firebase";
import { v4 as uuid4 } from 'uuid';


class CreatePublication extends Component {
    constructor() {
        super();
        this.state = this.initialState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    initialState(){
        let name = auth().currentUser.displayName
        if(name === null){
            name = auth().currentUser.email
        }
        console.log("nombre: ",name)
        return{
            id: uuid4(),
            title: '',
            content: '',
            user: auth().currentUser.uid,
            userName:name
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.props.createPublication(this.state)
        this.setState(this.initialState());
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-group form">
                <input className={"form-control"} name={"title"} onChange={this.handleChange}
                value={this.state.title}/>
                <textarea className="form-control" name="content" onChange={this.handleChange}
                          value={this.state.content}/>
                {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                <button type="submit" className="btn btn-submit px-5 mt-4">Post</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPublication: (publication) => dispatch(createPublication(publication))
    }
}

export default connect(null, mapDispatchToProps)(CreatePublication);