import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {signup} from "../../helpers/auth";

export default class SignUp extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        if (this.state.email.length >= 41 || this.state.password.length >= 21) {
            this.setState({error: 'Please enter a valid email and password'});
            return;
        }
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({error: error.message});
        }
    }


    render() {
        return (
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-3"/>
                    <div className="col-md-6">
                        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
                            <h1>Sign Up to <Link className="title ml-2" to="/">V-Game Blog</Link></h1>
                            <p className="lead">Fill in the form below to create an account.</p>
                            <div className="form-group">
                                <input className="form-control"
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
                                <input className="form-control"
                                       placeholder="Password"
                                       name="password"
                                       onChange={this.handleChange}
                                       value={this.state.password} type="password"
                                       required={true}
                                       minLength={8}
                                       maxLength={20}/>
                            </div>
                            <div className="form-group">
                                {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                                <button className="btn btn-dark px-5" type="submit">Sign up</button>
                            </div>
                            <br/>
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
