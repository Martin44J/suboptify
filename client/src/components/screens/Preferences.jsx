import { useState, useEffect } from "react";
import axios from "axios";
import PostLoginNavbar from "./components/PostLoginNavbar.jsx";
import PostLoginFooter from "./components/PostLoginFooter.jsx";
import ServicePreferencesCard from "./components/ServicePreferencesCard.jsx";
import {Accordion, Container, Collapse} from "react-bootstrap";
import "./Preferences.css";

const Preferences = ({history}) => {
    const [userServices, setUserServices] = useState(["loading"]);
    const [error, setError] = useState("");
    const [username,setUserName] = useState("");
    const [allServices, setAllServices] = useState([]);
    const [collapsedState,setCollapsedState] = useState(false);
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
      setCollapsedState((prevValue)=> {
        return !(prevValue);
      });
      if (allServices.length === 0) {
        setCollapsedState(true);
        setAllServices(["loading"]);
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
          const { data } = await axios.put("/api/private/fetchallpreferences",{userServices},config);
          setCollapsedState(false);
          setAllServices([]);
          setAllServices(data.allServices);
          setCollapsedState(true);
        } catch (error) {
          setError(error.response.data.error);
          console.log(error);
        }
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
                  <button className="btn btn-outline-secondary" onClick={fetchAllServices}>Show All Services</button>
                </Container>
                <Collapse in={collapsedState}>
                  <Container>
                    <Accordion>
                      {allServices.map((service,index) => {
                              return <ServicePreferencesCard key={index+userServices.length} id={index+userServices.length} service={service} preferenceChanged={preferenceChanged}/>
                      })}  
                    </Accordion>  
                  </Container>
                </Collapse>
            </div>
            <PostLoginFooter></PostLoginFooter>
        </>
    );  
}

export default Preferences;