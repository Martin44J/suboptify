import { useState, useEffect } from "react";
import axios from "axios";
import PostLoginNavbar from "./components/PostLoginNavbar.jsx";
import ServicePreferencesCard from "./components/ServicePreferencesCard.jsx";
import {Accordion, Container} from "react-bootstrap";
import "./Preferences.css";

const Preferences = ({history}) => {
    const [userServices, setUserServices] = useState(["loading"]);
    const [error, setError] = useState("");
    const [username,setUserName] = useState("");
    const [allServices, setAllServices] = useState([]);
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
            setUserServices([]);
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

    const preferenceChanged = async(serviceName,preference,newValue) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const { data } = await axios.put("/api/private/preferenceschanged",{serviceName,preference,newValue,userServices,allServices},config);
        setUserServices(data.userServices);
        setAllServices(data.allServices);
      } catch (error) {
        setError(error.response.data.error);
        console.log(error);
      }
    }

    const fetchAllServices = async() => {
      setAllServices(["loading"]);
      if (allServices.length === 0) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
          const { data } = await axios.put("/api/private/fetchallpreferences",{userServices},config);
          setAllServices([]);
          setAllServices(data.allServices);
        } catch (error) {
          setError(error.response.data.error);
          console.log(error);
        }
      } else {
        setAllServices([]);
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
                <Container>
                  <button className="btn btn-primary" onClick={fetchAllServices}>Show All Services</button>
                </Container>
                <Container>
                  <Accordion>
                    {allServices.map((service,index) => {
                            return <ServicePreferencesCard key={index+userServices.length} id={index+userServices.length} service={service} preferenceChanged={preferenceChanged}/>
                    })}  
                  </Accordion>  
                </Container>
            </div>
        </>
    );  
}

export default Preferences;