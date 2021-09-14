import React from "react";
import "./PreLoginNavbar.css";

const PreLoginNavbar = () =>{

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container" id="navbar-container">
                    <div className="navbar-header">
                        <a className = "nav-link PreLoginNavbar__nav-link active" id="navbar-brand-link" href = "/">
                        <p className="PreLoginNavbar__navbar-brand">suboptify</p>
                        </a>
                    </div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse navbar-right" id="navbarTogglerDemo02">
                        <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <a className="nav-link PreLoginNavbar__nav-link active" href="/about">About us</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default PreLoginNavbar;

