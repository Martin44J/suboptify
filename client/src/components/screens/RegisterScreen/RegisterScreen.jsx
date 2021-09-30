import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
// import SuboptifyBackground from "../components/SuboptifyBackground.jsx";
import { Button, Container, Row, Col } from 'react-bootstrap';



const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="register-screen">
      <Container>
          <Row>
            <Col>
              <div className="register-screen__info-div">
                <h1 className="register-screen__register-info register-screen__title-info">suboptify</h1>
                <p className="register-screen__register-info">Let us improve your tv expierence.</p>
              </div>
            </Col>  
            <Col>
              {/* <SuboptifyBackground/> */}
              <div className="form-box">
                <form onSubmit={registerHandler} className="register-screen__form">
                  {/* <h3 className="register-screen__title">suboptify</h3> */}
                  {error && <span className="error-message">{error}</span>}
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      id="name"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      required
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      required
                      id="password"
                      autoComplete="true"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      required
                      id="confirmpassword"
                      autoComplete="true"
                      placeholder="Confirm password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="d-grid gap-2 login-button-box">
                    <Button className="register-screen__submit-button" variant="primary" type="submit" size="lg">Create Account</Button>
                  </div>

                  <hr></hr>

                  <div className="d-grid gap-2 login-button-box">
                    <p className="login-message">Already have an account?</p>
                    <Button className="register-screen__login-button" variant="outline-secondary" href="/login" type="submit" size="sm">Log In</Button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
  );
};

export default RegisterScreen;