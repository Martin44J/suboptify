import React,{useState} from "react";
import {Accordion, Container, Row, Col} from 'react-bootstrap'

import "./ServicePreferencesCard.css";

const ServicePreferencesCard = (props) => {
    const [userService,changeUserPreferences] = useState(props.service);
    const checkBoxPreferences = [];
    const numberSelectPreferences = [];

    for (const preference in userService) {
        if (typeof userService[preference]==='boolean') {
            checkBoxPreferences.push(preference);
        } else if (typeof userService[preference]==='number') {
            if (preference !== "price" && preference !== "defaultPrice") {
                numberSelectPreferences.push(preference);
            }
        }
    }

    const setNewCheckBoxPreference= (preference) => {
        const newValue = !(userService[preference]);
        changeUserPreferences((prevValues) => {
            return {
                ...prevValues,
                [preference]: newValue
            }
        });
        props.preferenceChanged(userService.name,preference,newValue);    
    }

    const setNewNumberSelectPreference = (event) => {
        const preference = event.target.name;
        const newValue = parseInt(event.target.value);
        console.log(preference);
        changeUserPreferences((prevValues) => {
            return {
                ...prevValues,
                [preference]: newValue
            }
        });
        props.preferenceChanged(userService.name,preference,newValue);  
    }
    const logoPath = "img/Logos/"+userService.name+"Logo.png";

    return (
        <Accordion.Item eventKey={props.id}>
            <Accordion.Header><img className="logo-img-header" src={logoPath}/> <p className="header-tag">{userService.displayName}</p> <p className="price-tag">${props.service.price}</p></Accordion.Header>
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
                                        onChange={()=>{setNewCheckBoxPreference(preference)}}
                                        checked={userService[preference] ? 'checked' : ''} 
                                    />
                                    <label className="checkbox-label" for={preference}>{preference}</label>

                                    <br />
                                </>
                            );
                        })}
                        {numberSelectPreferences.map((preference) => {
                            return (
                                <>
                                    <label for={preference}>{preference}: </label>
                                    <select name={preference} id={preference} value={userService[preference]} onChange={setNewNumberSelectPreference}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    <br />
                                </>
                            );
                        })}
                    </Col>
                    <Col sm={1}>
                        ${props.service.price}
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