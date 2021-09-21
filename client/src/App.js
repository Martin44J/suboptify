import {BrowserRouter as Router, Switch, Route}from "react-router-dom";
import React from "react";

//routing
import PrivateRoute from "./components/routing/PrivateRoute";

//screens
// import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Watchlist from "./components/screens/Watchlist";
import HomeScreen from "./components/screens/HomeScreen";
import Preferences from "./components/screens/Preferences";

const App = () => {
  

  return (
  <Router>
    <div className= "App">
      <Switch>
        {/* <PrivateRoute exact path="/" component={PrivateScreen}/> */}
        <PrivateRoute exact path="/watchlist" component={Watchlist}/>
        <PrivateRoute exact path="/preferences" component={Preferences}/>
        <Route exact path="/" component={HomeScreen}/>
        <Route exact path="/login" component={LoginScreen}/>
        <Route exact path="/register" component={RegisterScreen}/>
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>
      </Switch>
    </div>
  </Router>);
}

export default App;
