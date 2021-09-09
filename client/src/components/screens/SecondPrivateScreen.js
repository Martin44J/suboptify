import { useState, useEffect } from "react";
import axios from "axios";
import "./secondPrivateRoute.css";

const SecondPrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [temp, setTemp] = useState("Anthony");
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchPrivateData = async () => {
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
        setError("problem with server");
      }
    };

    fetchPrivateData();
  }, []);

  const printUser = () =>{
    console.log(user);
  };

  const tempHandler = async() =>{
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const { data } = await axios.put("/api/private/secondPrivateRoutePut", {temp}, config);
        setData(data.data);
        setUser(data.user);
      } catch (error) {
        setError("could not set temp");
        console.log(error);
      }
      // setUser((prevValue) {
      //   return {
      //     prevValue,
      //     temp: temp
      //   }
      // })
    };

  

  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      {/* <div style={{background: "green", color: "white"}}>{user.username}</div> */}
      <h3>{data}</h3>
      <button onClick={printUser}>print user</button>
      <button onClick={tempHandler}>set temp</button>
    </>
  );
};

export default SecondPrivateScreen;