import { useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import "./HomeScreen.css";

const HomeScreen = ({history}) => {

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
          history.push("/watchlist");
        }
      }, [history]);

    return(
        //Title Section
        <div className="home-screen__root">
            <section className="home-screen__colored-section home-screen__title">

                <div className="container-fluid home-screen__colored-section-title">
                    <div className="row">

                        <div className="col-lg-6">
                            <h1 className="home-screen__big-heading">Optimize your tv subscriptions and save money.</h1>
                            <div className="home-screen__top-buttons">
                                <Link to= "/register" className="btn btn-dark btn-lg home-screen__download-button"> Register </Link>
                                <Link to= "/login" className="btn btn-outline-light btn-lg homes-screen__download-button"> Login </Link>
                            </div>
                        </div>

                        <div className="col-lg-6 img-div">
                            <img c="title-image" src="images/manWatchingTv.png" alt="man-watching-tv"/>
                        </div>

                    </div>

                </div>

            </section>
        </div>
    );
}

export default HomeScreen;