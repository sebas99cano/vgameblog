import React from "react";
import {Link} from "react-router-dom";
import {auth} from "../../services/firebase";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to={"/"}>V-Game Blog</Link>
                {auth().currentUser ?
                    <div className="navbar-nav">
                        <span className="navbar-text mr-3">Welcome - {auth().currentUser.email}</span>
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary" to={"/dashboard"}>Dashboard</Link>
                        <button className="nav-item nav-link mr-3 btn btn-outline-secondary" onClick={() => auth().signOut()}>Logout</button>
                    </div> :
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary" to={"/login"}>Log In</Link>
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary" to={"/signup"}>Sign Up</Link>
                    </div>}
            </div>
        </nav>
    )
}

export default Navbar;