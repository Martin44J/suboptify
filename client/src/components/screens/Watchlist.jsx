import { useState, useEffect } from "react";
import axios from "axios";
import WatchlistItem from "./components/WatchlistItem.jsx";
import { PlusLg } from 'react-bootstrap-icons';
import PostLoginNavbar from "./components/PostLoginNavbar.jsx";
import "./Watchlist.css";

const Watchlist = ({history}) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({shows:[{title:"Loading watchlist"}]});
  const [showInput,changeShow] = useState("");
  // const [data, setData] = useState("");
  const [addingError, setAddingError] = useState("");
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
      const showsAfterRemoval = [...user.shows];
      showsAfterRemoval.splice(id,1);
      setUser((prevValues) => {
        return {
          ...prevValues,
          shows: [...showsAfterRemoval]
        };
      });
      console.log(user.shows);
      const { data } = await axios.put("/api/private/watchlistremove",{id},config);
      // setData(data.data);
      setUser(data.user);
    } catch (error) {
      setError(error.response.data.error);
    }
  }



  return error? (
    <span className="error-message">{error}</span>
    ): (
      <>
      <div className="screen">
        <PostLoginNavbar/>
        <div className="container watchlist-container">
          <div className="row">
            <div className="col-lg-8">
             <h3>Watchlist</h3>
              {/* InputForm */}
              <div id="input-area">
                <form className="media-input" onSubmit={e => e.preventDefault()}>
                    <input id="watchlist-input" onChange={handleChange} className="form-control" type="text" name="postTitle" placeholder="Show/Movie Name" aria-label="Show/Movie Name" aria-describedby="watchlist-screen__button-addon1" value={showInput}/>
                    <button onClick={addShow} id="watchlist-screen__button-addon1" type="submit" name="button"><PlusLg/></button>
                </form>
                {addingError && <p className="watchlist-screen__errorDisplay">{addingError}</p>}
              </div>

              {/* Mapping Shows to a watchlist Item */}
              {user.shows.map((show,index)=>{return (
                <WatchlistItem 
                key={index} 
                id={index} 
                show={show} 
                removeShow={removeShow}/>
              )
              })}
            </div>
            <div className="col-lg-4">
            <h3>Best Pricing Plan:</h3>
            </div>
          </div>
        </div>
      </div>
      </>
    );

};

export default Watchlist;