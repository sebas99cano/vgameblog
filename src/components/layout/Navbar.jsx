import React from "react";
import {Link} from "react-router-dom";
import {auth} from "../../services/firebase";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>V-Game Blog <i className="bi bi-controller" /></Link>
                {auth().currentUser ?
                    <div className="navbar-nav">
                        <span className="navbar-text mr-3">Welcome - {auth().currentUser.email}</span>
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary"
                              to={"/dashboard"}>Dashboard <i className="bi bi-clipboard"/></Link>
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary"
                              to={"/favorites"}>Favorites <i className="bi bi-star-half"/></Link>
                        <button className="nav-item nav-link mr-3 btn btn-outline-secondary"
                                onClick={() => auth().signOut()}>Logout <i className="bi bi-door-open-fill"/>
                        </button>
                    </div> :
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary" to={"/login"}>
                            Log In <i className="bi bi-box-arrow-right"/></Link>
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary" to={"/signup"}>
                            Sign Up <i className="bi bi-person-circle"/></Link>
                    </div>}
            </div>
        </nav>
    )
}

export default Navbar;