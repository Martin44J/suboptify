import React from "react";
import "./PreLoginNavbar.css";
import { Link } from "react-router-dom";

const PreLoginNavbar = (props) =>{

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container" id="navbar-container">
                    <div className="navbar-header">
                        <Link to="/" className = "nav-link PreLoginNavbar__nav-link active" id="navbar-brand-link" >
                        <p className="PreLoginNavbar__navbar-brand">suboptify</p>
                        </Link>
                    </div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse navbar-right" id="navbarTogglerDemo02">
                        <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <Link className="nav-link PreLoginNavbar__nav-link active" to="/about" >About us</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default PreLoginNavbar;

