import React,{useState} from "react";
import {Accordion, Container, Row, Col} from 'react-bootstrap'

import "./ServicePreferencesCard.css";

const ServicePreferencesCard = (props) => {
    const [userService,changeUserPreferences] = useState(props.service);
    const checkBoxPreferences = [];
    const numberSelectPreferences = [];
    console.log(userService);

    for (const preference in userService) {
        // console.log(typeof userService[preference]);
        if (typeof userService[preference]==='boolean') {
            checkBoxPreferences.push(preference);
        } else if (typeof userService[preference]==='number') {
            if (preference !== "price" && preference !== "defaultPrice") {
                numberSelectPreferences.push(preference);
            }
        }
    }
    // console.log(checkBoxPreferences);
    // console.log(numberSelectPreferences);
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

    const logoPath = "img/Logos/"+userService.name+"Logo.png";

    return (
        <Accordion.Item eventKey={props.id}>
            <Accordion.Header><img className="logo-img-header" src={logoPath}/> <p className="header-tag">{userService.displayName}</p></Accordion.Header>
            <Accordion.Body>
            <Container>
                <Row>
                    <Col sm={4}><img className="logo-img" alt={userService.displayName +" logo"} src={logoPath}/></Col>
                    <Col sm={7}>
                        {checkBoxPreferences.map((preference) => {
                            return (
                                <>
                                    <input
                                        type="checkbox" 
                                        id={preference} 
                                        name={preference} 
                                        value={preference} 
                                        onChange={()=>{setNewPreference(preference)}}
                                        checked={userService[preference] ? 'checked' : ''} 
                                    />
                                </>
                            );
                        })}
                    </Col>
                    <Col sm={1}>
                        {userService.price}
                    </Col>
                </Row>
            </Container>
            </Accordion.Body>
        </Accordion.Item>
    );
}


// {/* <h3>{userService.displayName}</h3>
//             <h4>{userService.price}</h4>
//             {checkBoxPreferences.map((preference) => {
//                 return (
//                     <input
//                         type="checkbox" 
//                         id={preference} 
//                         name={preference} 
//                         value={preference} 
//                         onChange={()=>{setNewPreference(preference)}}
//                         checked={userService[preference] ? 'checked' : ''} 
//                     />
//                 );
//             })} */}


export default ServicePreferencesCard;