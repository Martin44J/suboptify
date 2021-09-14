import React from "react";
import LoadingRing from "./LoadingRing.jsx";
import { XSquare } from 'react-bootstrap-icons';
import "./WatchlistItem.css";

const WatchlistItem=(props) => {
    if (props.show.title === "Loading watchlist") {
        return (
            <div>
                <LoadingRing size="big"/>
            </div>
        )
    } else if (props.show.title === "Loading watchlist item"){
        return (
            <div>
                <LoadingRing size="little"/>
            </div>
        )
    } else {
        return (
            <div>
                {/*Remove Show Button*/}
                <h5>
                    <XSquare className="x-icon" onClick={()=>{props.removeShow(props.id)}}/>
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