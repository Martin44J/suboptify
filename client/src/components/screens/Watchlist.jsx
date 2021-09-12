import { useState, useEffect } from "react";
import axios from "axios";
import WatchlistItem from "./components/WatchlistItem.jsx";
import "./Watchlist.css";


const Watchlist = ({history}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({shows:[{title:"Loading watchlist"}]});
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

  const addShow = async() =>{
    setUser((prevValues) => {
      return {
        ...prevValues,
        shows: [...prevValues.shows ,{title:"Loading watchlist item"}]
      }
    });
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

    const removeShow = async(id) => {
      console.log(id+"martin needs to teach me how to do this bullshit");
    }
  
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
                <button onClick={addShow} className="btn btn-outline-primary" id="button-addon1" type="submit" name="button">Add</button>
              </form>
            </div>
            {user.shows.map((show,index)=>{return <WatchlistItem key={index} id={index} show={show} removeShow={removeShow}/>})}
            <button onClick={printUser}>print user</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Watchlist;