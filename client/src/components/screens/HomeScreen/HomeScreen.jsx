import React, { useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import PreLoginNavbar from "../components/PreLoginNavbar";
import "./HomeScreen.css";

const HomeScreen = ({history}) => {

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
          history.push("/watchlist");
        }

      }, [history]);



      document.body.style.overflow = "scroll";
    return(
        
        <div className="home-screen__root">


            {/* title section */}
            <section className="home-screen__colored-section home-screen__title">
                <div className="home-screen__container-fluid home-screen__colored-section-title">

                    <PreLoginNavbar/>
                    <div className="row">
                        <div className="col-lg-6">
                            <h1 className="home-screen__big-heading">Optimize your tv subscriptions and save money.</h1>
                            <div className="home-screen__top-buttons">
                                <Link to= "/register" className="btn btn-dark btn-lg home-screen__download-button"> Register </Link>
                                <Link to= "/login" className="btn btn-outline-light btn-lg homes-screen__download-button"> Login </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 home-screen__img-div">
                            <img className="home-screen__title-image" src="img/manWatchingTv.png" alt="man-watching-tv"/>
                        </div>
                    </div>
                </div>
            </section>


            {/* features section */}
            <section className="home-screen__white-section" id="features">
                <div className="home-screen__container-fluid">
                    <div className="row">
                        <div className="col-lg-4 home-screen__feature-box home-screen__features-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                            <h3 className="home-screen__feature-title">Curate Watchlists</h3>
                            <p className="home-screen__features-explain">Find the cheapest way to watch a list of your favorite shows.</p>
                        </div>

                        <div className="home-screen__feature-box col-lg-4 home-screen__features-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                            </svg>
                            <h3 className="home-screen__feature-title">Save money</h3>
                            <p className="home-screen__features-explain">Never over-spend on tv subscriptions again.</p>
                        </div>

                        <div className="home-screen__feature-box col-lg-4 home-screen__features-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            <h3 className="home-screen__feature-title">Centralized Search</h3>
                            <p className="home-screen__features-explain">Find all your favorite tv shows in one centralized place.</p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Call to action */}
            <section className="home-screen__colored-section" id="cta">

                <div className="home-screen__container-fluid">

                <h1 className="home-screen__big-heading">All your TV in one place, at the cheapest possible price.</h1>
                <Link to= "/register" className="btn btn-dark btn-lg home-screen__download-button"> Register </Link>
                <Link to= "/login" className="btn btn-outline-light btn-lg homes-screen__download-button"> Login </Link>
                </div>
            </section>


            {/* Footer section*/}
            <footer className="white-section" id="footer">
                <div className="container-fluid">
                <p className="footer-text">© Copyright 2021 Suboptify</p>
                </div>
            </footer>
        </div>
    );
}

export default HomeScreen;