import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import SuboptifyBackground from "../components/SuboptifyBackground.jsx";
import { Button, Container, Row, Col} from 'react-bootstrap';
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  //avoids sending users to login page if they are already logged in.
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/watchlist");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/watchlist");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <Container>
        <Row>
          <Col>
            <div className="login-screen__info-div">
              <h1 className="login-info title-info">suboptify</h1>
              <p className="login-info">Let us improve your tv expierence.</p>
            </div>
          </Col>  
          <Col>
            <div className="form-box">
                {/* <SuboptifyBackground /> */}
              <form onSubmit={loginHandler} className="login-screen__form">
                {/* <h3 className="login-screen__title">suboptify</h3> */}
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                  <input
                    type="email"
                    required
                    id="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    tabIndex={1}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    required
                    id="password"
                    autoComplete="true"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    tabIndex={2}
                  />
                </div>
                <div className="d-grid gap-2 login-button-box">
                  <Button tabIndex={3} className="login-screen__login-button"variant="primary" type="submit" size="lg">Log In</Button>
                </div>

                <Link to="/forgotpassword" tabIndex={4} className="login-screen__forgotpassword">
                    Forgot Password?
                </Link>
                <hr></hr>


                <div className="d-grid gap-2 register-button-box">
                  <Button className="login-screen__register-button" variant="outline-secondary" size="sm" href="/register">Create Account</Button>
                </div>
                
                
              </form>
            </div>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginScreen;