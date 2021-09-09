import { useState, useEffect } from "react";
import axios from "axios";
import "./secondPrivateRoute.css";

const SecondPrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private/secondPrivateRoute", config);
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);

  const printUser = () =>{
    console.log(user);
  };
  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      {/* <div style={{background: "green", color: "white"}}>{user.username}</div> */}
      <button onClick={printUser}>print user</button>
    </>
  );
};

export default SecondPrivateScreen;