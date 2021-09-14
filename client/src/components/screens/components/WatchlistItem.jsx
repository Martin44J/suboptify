import React from "react";
import LoadingRing from "./LoadingRing.jsx";
import { XSquare } from 'react-bootstrap-icons';

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
                <h5>
                    {/*Remove Show Button*/}
                    <XSquare onClick={()=>{props.removeShow(props.id)}}/>
                    {" "+props.show.title}
                </h5>
                {/*List of services */}
                {/* <ul>
                    {props.show.services.map((service)=>{
                        <li>{service}</li>
                    })}
                </ul> */}
            </div>
        );
            }
}

export default WatchlistItem;