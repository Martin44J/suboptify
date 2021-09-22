import { useState, useEffect } from "react";
import axios from "axios";
import PostLoginNavbar from "./components/PostLoginNavbar.jsx";
import "./Preferences.css";

const Preferences = ({history}) => {
    const [preferences, setPreferences] = useState({preferences:"loading"});
    const [userServices, setUserServices] = useState([]);
    const [error, setError] = useState("");

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
            let serviceCombination = [];
            for (let i = 0; i<data.serviceCombination.length; i++) {
                serviceCombination.push(data.serviceCombination[i]);
            }
            serviceCombination.map((service)=>{
                setUserServices((prevValues)=> {
                    return [
                        ...prevValues,
                        {   
                            ...preferences[service.name],
                            displayName: service.displayName
                        }
                    ]
                });
            });
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
                        return <li key={index}>{service.displayName}</li>
                    })}
                </ul>
            </div>
        </>
    );  
}

export default Preferences;