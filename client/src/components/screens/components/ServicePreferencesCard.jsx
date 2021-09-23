import React,{useState} from "react";
import "./ServicePreferencesCard.jsx";

const ServicePreferencesCard = (props) => {
    const [userService] = useState(props.service);
    console.log(userService.name);
    return (
        <div className="card">
            <div className="card-body">
                <div className="flex-container">
                    <div className="flex-child selector-child">
                    {/*Collapse Button */}
                        <a
                            id={userService.name+"buttonId"}
                            data-bs-toggle="collapse"
                            data-bs-target={"."+userService.name+"collapseClass"}
                            aria-expanded="false"
                            aria-controls={"."+userService.name+"collapseClass"}
                            className="btn btn-primary"
                        >
                        Collapse
                        </a>
                    </div>
                    <div className="flex-child pre-collapse-child">
                        <div className={"flex-container collapse "+userService.name+"collapseClass show"}>
                        {/* Pre collapse view  */}
                            <div className="flex-child first-child pre-drop-down-image-child">
                                <img src={"img/"+userService.name+"Logo.png"} alt="" />
                            </div>
                            <div className="flex-child">
                                <h3>{userService.displayName}</h3>
                            </div>
                            <div className="flex-child last-child">
                                <strong>Monthly Price: ${userService.price}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"flex-container collapse " + userService.name + "collapseClass"}>
                {/* Post collapse view  */}
                    <div className="flex-child first-child">
                        <img src={"img/"+userService.name+"Logo.png"} alt=""/>
                    </div>
                    <div className="flex-child">

                        {/* code for preferences checkboxes/number dropdowns in here */}

                    </div>
                    <div className="flex-child">
                        <p>
                            Base Price: ${userService.defaultPrice}
                        </p>
                        <p>
                            Additional Price: ${userService.price - userService.defaultPrice}
                        </p>
                        <strong>
                            Monthly Price: ${userService.price}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServicePreferencesCard;