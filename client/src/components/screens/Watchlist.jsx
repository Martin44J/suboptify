import { useState, useEffect } from "react";
import axios from "axios";
import "./Watchlist.css";


const Watchlist = ({history}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({shows:["Loading shows"]});
  const [show,changeShow] = useState("");
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
        const { data } = await axios.get("/api/private/watchlist", config);
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

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    changeShow(value);
  }

  const showHandler = async() =>{
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const { data } = await axios.put("/api/private/watchlistadd", {show}, config);
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
      changeShow("");
    };


  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      {/* <div style={{background: "green", color: "white"}}>{user.username}</div> */}
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h1>Watchlist</h1>
            <div className="input-group mb-3" id = "show-input">
              <form onSubmit={e => e.preventDefault()}>
                <input onChange={handleChange} className="form-control" type="text" name="postTitle" placeholder="Show/Movie Name" aria-label="Show/Movie Name" aria-describedby="button-addon1" value={show}/>
                <button onClick={showHandler} className="btn btn-outline-primary" id="button-addon1" type="submit" name="button">Add</button>
              </form>
            </div>
            {user.shows.map((show,index)=>{return <p key={index}>{show}</p>})}
            <button onClick={printUser}>print user</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;