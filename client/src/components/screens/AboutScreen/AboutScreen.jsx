import React from "react";
import PreLoginNavbar from "../components/PreLoginNavbar";
import "./AboutScreen.css";


const AboutScreen = ()=> {

    const aboutScreenContentFirstPart = `Suboptify was created in June 2021 with the goal of making the entertainment media watching expierence 
    easier for end users. Currently the website allows users to create a watchlist, which then calculates the most 
    cost effective set of subscriptions for that user.`
    
    const aboutScreenContentSecondPart = `In the near future we want to make watchlists 
    sharable so that different users can collaborate on media they want to watch. Eventually we would like to
    have Suboptify manage the users subscriptions, auto-starting and canceling subscriptions to make sure the 
    end user saves money, and never has to worry if they will be able to watch a new show.`;

    document.body.style.overflow = "scroll";

    return(
        <div>
            <section className="about-screen__colored-section">
                <div className="about-screen__container-fluid about-screen__colored-section-title">
                    <PreLoginNavbar/>

                </div>
            </section>

            <div className="container-fluid about-screen__container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="about-screen__title-text">Let us save you money on tv.</h2>
                        <br></br>
                        <p className="about-screen__body-text">{aboutScreenContentFirstPart}<br/><br/>{aboutScreenContentSecondPart}</p>
                        <h6 className="feedback-text">We need help! If you would like to get involved click <a href="https://forms.gle/G4zSonT3fZzHfYHc8">here</a></h6>
                    </div>
                    <div className="col-md-6">
                        <img className="about-screen__image" src="img/team.png" alt="Anthony-and-Martin"/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutScreen;