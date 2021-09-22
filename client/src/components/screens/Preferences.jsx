import { useState, useEffect } from "react";
import axios from "axios";
import PostLoginNavbar from "./components/PostLoginNavbar.jsx";
import "./Preferences.css";

const Preferences = ({history}) => {
    const [preferences, setPreferences] = useState({preferences:"loading"});
    const [userServices, setUserServices] = useState([]);
    const [error, setError] = useState("");

    const printService = (service) => {
        console.log(service);
    }
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
            setPreferences(data.preferences);
            setUserServices(data.userServices);
          } catch (error) {
            setError(error.response.data.error);
          }
        };
    
        fetchPrivateData();
    }, []);

    return error? (
        <span className="error-message">{error}</span>
        ): (
        <>
            <div>
                <PostLoginNavbar />
                <ul>
                    {userServices.map((service,index) => {
                        return <li onClick={()=>{printService(service)}} key={index}>{service.price}</li>
                    })}
                </ul>
            </div>
        </>
    );  
}

export default Preferences;