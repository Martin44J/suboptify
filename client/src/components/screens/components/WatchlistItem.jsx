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
                
                <ul>
                    {props.show.services.map((service)=>{
                        return <li>{service.displayName}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default WatchlistItem;