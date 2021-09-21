import { useState, useEffect } from "react";
import axios from "axios";
import PostLoginNavbar from "./components/PostLoginNavbar.jsx";
import "./Preferences.css";

const Preferences = ({history}) => {
    const [preferences, setPreferences] = useState({preferences:"loading"});
    const [userServices, setUserServices] = useState([]);
    const [error, setError] = useState("");
    const [sup,setsup] = useState("");

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
            console.log(data);
            console.log(data.preferences);
            setsup("hello");
            console.log(sup);
            setPreferences(data.preferences);
            console.log(preferences);
            let array = [];
            for (let i = 0; i<data.serviceCombination.length; i++) {
                array.push(data.serviceCombination[i].name);
            }
            array.map((service)=>{
                setUserServices((prevValues)=> {
                    return [
                        ...prevValues,
                        preferences[service]
                    ]
                });
            });
          } catch (error) {
            console.log(error);
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
                        return <li key={index}>{service}</li>
                    })}
                </ul>
            </div>
        </>
    );  
}

export default Preferences;