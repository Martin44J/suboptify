import { useState, useEffect } from "react";
import axios from "axios";
import PostLoginNavbar from "./components/PostLoginNavbar.jsx";
import ServicePreferencesCard from "./components/ServicePreferencesCard.jsx";
import {Accordion, Container} from "react-bootstrap";
import "./Preferences.css";

const Preferences = ({history}) => {
    const [userServices, setUserServices] = useState([]);
    const [error, setError] = useState("");
    const [username,setUserName] = useState("");
    document.body.style.overflow = "scroll";

    useEffect(() => {
        const fetchPrivateData = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
    
          try {
            const { data } = await axios.get("/api/private/preferences", config);
            setUserServices(data.userServices);
            setUserName(data.username);
          } catch (error) {
            setError(error.response.data.error);
            localStorage.removeItem("authToken");
            history.push("/login");
          }
        };
    
        fetchPrivateData();
    }, []);

    const preferenceChanged = async(serviceName,preferenceChanged,newValue) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const { data } = await axios.put("/api/private/preferencesChanged",{serviceName,preferenceChanged,newValue},config);
        setUserServices(data.userServices);
      } catch (error) {
        setError(error.response.data.error);
      }
    }

    return error? (
        <span className="error-message">{error}</span>
        ): (
        <>
            <div>
                <PostLoginNavbar screen="Preferences" username={username} />
                
                <Container>
                  <Accordion>
                    {userServices.map((service,index) => {
                        return <ServicePreferencesCard key={index} id={index} service={service} preferenceChanged={preferenceChanged}/>
                    })}
                  </Accordion>
                </Container>
                
            </div>
        </>
    );  
}

export default Preferences;