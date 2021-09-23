import { useState, useEffect } from "react";
import axios from "axios";
import PostLoginNavbar from "./components/PostLoginNavbar.jsx";
import ServicePreferencesCard from "./components/ServicePreferencesCard.jsx";
import "./Preferences.css";

const Preferences = ({history}) => {
    const [userServices, setUserServices] = useState([]);
    const [error, setError] = useState("");
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
          } catch (error) {
            setError(error.response.data.error);
            localStorage.removeItem("authToken");
            history.push("/login");
          }
        };
    
        fetchPrivateData();
    }, []);

    const preferencesChanged = async(serviceName,preferenceChanged,newValue) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const { data } = await axios.put("/api/private/preferencesChanged",{serviceName,preferenceChanged,newValue,userServices},config);
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
                <PostLoginNavbar />
                <ul>
                    {userServices.map((service,index) => {
                        return <ServicePreferencesCard key={index} service={service} preferencesChanged={preferencesChanged}/>
                    })}
                </ul>
            </div>
        </>
    );  
}

export default Preferences;