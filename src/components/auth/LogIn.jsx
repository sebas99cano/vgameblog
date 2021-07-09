import React, {Component} from "react";
import {Link} from "react-router-dom";
import {signin, signInWithFacebook, signInWithGitHub, signInWithGoogle} from "../../helpers/auth";

export default class LogIn extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
        this.facebookSignIn = this.facebookSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ""});
        try {
            await signin(this.state.email, this.state.password);
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    async googleSignIn() {
        try {
            await signInWithGoogle();
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    async githubSignIn() {
        try {
            await signInWithGitHub();
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    async facebookSignIn() {
        try {
            await signInWithFacebook();
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    render() {
        return (
            <div className="container text-center">
                <div className="row">
                    <div className={"col-md-3"} />
                    <div className="col-md-6">
                        <form
                            className="py-5 px-5 content-align-center"
                            autoComplete="off"
                            onSubmit={this.handleSubmit}>
                            <h1 className={"m-5"}>Login to<Link className="title ml-2" to="/">V-Game Blog</Link></h1>
                            <button className="btn btn-dark mr-2" type="button" onClick={this.googleSignIn}>
                                Sign in with Google <i className="bi bi-google" />
                            </button>
                            <button className="btn btn-dark mr-2" type="button" onClick={this.githubSignIn}>
                                Sign in with GitHub <i className="bi bi-github" />
                            </button>
                            <p className="lead m-3">OR</p>
                            <hr/>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    required={true}
                                    minLength={15}
                                    maxLength={40}/>
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    type="password"
                                    required={true}
                                    minLength={8}
                                    maxLength={20}/>
                            </div>
                            <div className="form-group">
                                {this.state.error ? (<p className="text-danger">{this.state.error}</p>) : null}
                                <button className="btn btn-dark px-5" type="submit">Login</button>
                            </div>
                            <hr/>
                            <p >Don't have an account? <Link to="/signup">Sign up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

