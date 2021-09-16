import React from "react";
import "./PostLoginNavbar.css";

const PostLoginNavbar = () =>{
    return(
        <div className="PostLoginNavbar__navbar-div">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container" id="navbar-container">
                    <div className="navbar-header">
                        <a className = "nav-link active" href = "/watchlist" id="navbar-brand-link">
                        <p className="navbar-brand brand-styling">suboptify</p>
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse navbar-right" id="navbarTogglerDemo02">
                        <ul className="nav navbar-nav navbar-right">
                            <li className = "nav-item" id="home"><a className = "nav-link active" href="/watchlist">Watchlist</a></li>
                            <li className = "nav-item" id="contact"><a className = "nav-link active" href="/preferences">Preferences</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default PostLoginNavbar;