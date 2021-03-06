import React, {Component} from "react";
import {createPublication} from "../../store/actions/publicationActions";
import {connect} from "react-redux";
import {auth} from "../../services/firebase";
import {v4 as uuid4} from 'uuid';


class CreatePublication extends Component {
    constructor() {
        super();
        this.state = this.initialState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    initialState() {
        let name = auth().currentUser.displayName
        if (name === null) {
            name = auth().currentUser.email
        }
        return {
            id: uuid4(),
            title: '',
            content: '',
            user: auth().currentUser.uid,
            userName: name,
            timestamp:null
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.state.timestamp=Date.now();
        this.props.createPublication(this.state)
        this.setState(this.initialState());
    }

    render() {
        return (
            <div className={"border border-radius rounded border-dark mb-3"}>
                <form onSubmit={this.handleSubmit} className="py-5 px-5 content-align-center form"
                      autoComplete="off">
                    <h3 className={"text-center"}>Post it</h3>
                    <label>Title</label>
                    <input className={"form-control"} name={"title"} onChange={this.handleChange}
                           value={this.state.title}
                           minLength={10}
                           maxLength={100}
                           required={true}/>
                    <label>Content</label>
                    <textarea className="form-control" name="content" onChange={this.handleChange}
                              value={this.state.content}
                              minLength={20}
                              maxLength={500}
                              required={true}/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-dark px-5 mt-4 ">Post <i className="bi bi-mailbox"/></button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPublication: (publication) => dispatch(createPublication(publication))
    }
}

export default connect(null,mapDispatchToProps)(CreatePublication);