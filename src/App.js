import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Dashboard from "../src/components/Dashboard";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import React, {Component} from "react";

import {auth} from "./services/firebase";
import Home from "./components/Home";
import NotFoundPage from "./components/NotFoundPage";
import Footer from "./components/layout/Footer";
import Comment from "./components/comment/Comment";


function PrivateRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{pathname: "/login", state: {from: props.location}}}
                    />
                )
            }
        />
    );
}

function PublicRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === false ? <Component {...props} /> : <Redirect to="/"/>
            }
        />
    );
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
            loading: true,
        };
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false,
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                });
            }
        });
    }

    render() {
        return this.state.loading === true ? (
            <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        ) : (
            <Router>
                <Navbar/>
                <br/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute exact path="/dashboard" authenticated={this.state.authenticated} component={Dashboard}/>
                    <PrivateRoute exact path="/comments" authenticated={this.state.authenticated} component={Comment}/>
                    <PublicRoute exact path="/signup" authenticated={this.state.authenticated} component={SignUp}/>
                    <PublicRoute exact path="/login" authenticated={this.state.authenticated} component={LogIn}/>
                    <Route path="*" component={NotFoundPage}/>
                </Switch>
                <Footer />
            </Router>
        );
    }
}

export default App;
