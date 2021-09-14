import { useState, useEffect } from "react";
import axios from "axios";
import WatchlistItem from "./components/WatchlistItem.jsx";
import "./Watchlist.css";

const Watchlist = ({history}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({shows:[{title:"Loading watchlist"}]});
  const [showInput,changeShow] = useState("");
  // const [data, setData] = useState("");
  const [addingError, setAddingError] = useState("");
  

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
        setError(error.response.data.error);
      }
    };

    fetchPrivateData();
  }, []);

  const logoutHandler = () =>{
    localStorage.removeItem("authToken");
    history.push("/");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(value);
    changeShow(value);
  }

  const addShow = async() =>{
    if (showInput==="") {
      setAddingError("Enter a show or movie");
      setTimeout(() => {
        setAddingError("");
      }, 3000);
    } else {
      let showQuery = showInput.replaceAll(" ", "%20");
      setUser((prevValues) => {
        return {
          ...prevValues,
          shows: [...prevValues.shows, { title: "Loading watchlist item" }]
        };
      });
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
        const { data } = await axios.put("/api/private/watchlistadd", {showQuery}, config);
        // setData(data.data);
        setUser(data.user);
      } catch (error) {
        setAddingError(error.response.data.error);
        console.log("here");
        setUser((prevValues) => {
          return {
            ...prevValues,
            shows: [...user.shows]
          };
        });
        setTimeout(() => {
          setAddingError("");
        }, 3000);
      }
    }

    changeShow("");
  };

  const removeShow = async(id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const { data } = await axios.put("/api/private/watchlistremove",{id},config);
      // setData(data.data);
      setUser(data.user);
    } catch (error) {
      setError(error.response.data.error);
    }
  }
  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      {/* <div style={{background: "green", color: "white"}}>{user.username}</div> */}
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
              <form onSubmit={e => e.preventDefault()}>
                <h1>Watchlist</h1>
                <div className="input-group mb-3" id="watchlist-screen__watchlist-input">
                  <input id="watchlist-input" onChange={handleChange} className="form-control" type="text" name="postTitle" placeholder="Show/Movie Name" aria-label="Show/Movie Name" aria-describedby="watchlist-screen__button-addon1" value={showInput}/>
                  <button onClick={addShow} className="btn btn-outline-primary" id="watchlist-screen__button-addon1" type="submit" name="button">Add</button>
                </div>
                <p className="watchlist-screen__errorDisplay">{addingError}</p>
              </form>
            {user.shows.map((show,index)=>{return <WatchlistItem key={index} id={index} show={show} removeShow={removeShow}/>})}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
      </div>
    </>
  );
};

export default Watchlist;