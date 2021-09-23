import React,{useState} from "react";
import "./ServicePreferencesCard.jsx";

const ServicePreferencesCard = (props) => {
    const [userService,changeUserPreferences] = useState(props.service);
    const checkBoxPreferences = [];
    const numberSelectPreferences = [];
    console.log(userService.name);
    for (const preference in userService) {
        console.log(typeof userService[preference]);
        if (typeof userService[preference]==='boolean') {
            checkBoxPreferences.push(preference);
        } else if (typeof userService[preference]==='number') {
            if (preference !== "price" && preference !== "defaultPrice") {
                numberSelectPreferences.push(preference);
            }
        }
    }
    console.log(checkBoxPreferences);
    console.log(numberSelectPreferences);
    const setNewPreference=(preference) =>{
        if (userService[preference] === false) {
            changeUserPreferences((prevValues) => {
                return {
                    ...prevValues,
                    [preference]:true
                }
            });
        } else {
            changeUserPreferences((prevValues) => {
                return {
                    ...prevValues,
                    [preference]:false
                }
            });
        }
        props.preferenceChanged(userService.name,preference,userService[preference]);
        // const newValue = e.target.checked;
        // changeUserPreferences((prevValues) => {
        //     return {
        //         ...prevValues,
        //         [preference]: newValue
        //     }
        // });

    }
    return (
        <div className="card">
            <h3>{userService.displayName}</h3>
            <h4>{userService.price}</h4>
            {checkBoxPreferences.map((preference) => {
                return (
                    <input
                        type="checkbox" 
                        id={preference} 
                        name={preference} 
                        value={preference} 
                        onChange={()=>{setNewPreference(preference)}}
                        checked={userService[preference] ? 'checked' : ''} 
                    />
                );
            })}
        </div>
    );

    // <div className="card">
    //         <div className="card-body">
    //             <div className="flex-container">
    //                 <div className="flex-child selector-child">
    //                 {/*Collapse Button */}
    //                     <a
    //                         id={userService.name+"buttonId"}
    //                         data-bs-toggle="collapse"
    //                         data-bs-target={"."+userService.name+"collapseClass"}
    //                         aria-expanded="false"
    //                         aria-controls={"."+userService.name+"collapseClass"}
    //                         className="btn btn-primary"
    //                     >
    //                     Collapse
    //                     </a>
    //                 </div>
    //                 <div className="flex-child pre-collapse-child">
    //                     <div className={"flex-container collapse "+userService.name+"collapseClass show"}>
    //                     {/* Pre collapse view  */}
    //                         <div className="flex-child first-child pre-drop-down-image-child">
    //                             <img src={"img/"+userService.name+"Logo.png"} alt="" />
    //                         </div>
    //                         <div className="flex-child">
    //                             <h3>{userService.displayName}</h3>
    //                         </div>
    //                         <div className="flex-child last-child">
    //                             <strong>Monthly Price: ${userService.price}</strong>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>

    //             <div className={"flex-container collapse " + userService.name + "collapseClass"}>
    //             {/* Post collapse view  */}
    //                 <div className="flex-child first-child">
    //                     <img src={"img/"+userService.name+"Logo.png"} alt=""/>
    //                 </div>
    //                 <div className="flex-child">

    //                     {/* code for preferences checkboxes/number dropdowns in here */}

    //                 </div>
    //                 <div className="flex-child">
    //                     <p>
    //                         Base Price: ${userService.defaultPrice}
    //                     </p>
    //                     <p>
    //                         Additional Price: ${userService.price - userService.defaultPrice}
    //                     </p>
    //                     <strong>
    //                         Monthly Price: ${userService.price}
    //                     </strong>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
}

export default ServicePreferencesCard;