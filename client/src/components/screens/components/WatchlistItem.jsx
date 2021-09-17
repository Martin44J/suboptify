import React from "react";
import LoadingRing from "./LoadingRing.jsx";
import { XLg } from 'react-bootstrap-icons';
import "./WatchlistItem.css";

const WatchlistItem=(props) => {
    if (props.show.title === "Loading watchlist") {
        return (
            <div className="watchlist-loading">
                <LoadingRing size="big"/>
            </div>
        )
    } else if (props.show.title === "Loading watchlist item"){
        return (
            <div className="watchlist-loading">
                <LoadingRing size="little"/>
            </div>
        )
    } else {
        return (
            <div className="watchlist-item">
                {/*Remove Show Button*/}
                <h5>
                    <XLg className="x-icon" onClick={()=>{props.removeShow(props.id)}}/>
                    {" "+props.show.title}
                </h5>
                
                {props.show.services.map((service,index)=>{
                    return <img key={index} src={"/public/img/"+service.name+"Logo.png"} alt={service.name+"Logo"} />;
                })}
            </div>
        );
    }
}

export default WatchlistItem;