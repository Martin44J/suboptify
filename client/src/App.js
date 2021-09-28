import {BrowserRouter as Router, Switch, Route}from "react-router-dom";
import React from "react";

//routing
import PrivateRoute from "./components/routing/PrivateRoute";

//screens
// import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen/LoginScreen.jsx";
import RegisterScreen from "./components/screens/RegisterScreen/RegisterScreen.jsx";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen/ForgotPasswordScreen.jsx";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen/ResetPasswordScreen";
import Watchlist from "./components/screens/Watchlist/Watchlist.jsx";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen.jsx";
import AboutScreen from "./components/screens/AboutScreen/AboutScreen.jsx"
import Preferences from "./components/screens/Preferences/Preferences.jsx";

const App = () => {


  return (
  <Router>
    <div className= "App">
      <Switch>
        {/* <PrivateRoute exact path="/" component={PrivateScreen}/> */}
        <PrivateRoute exact path="/watchlist" component={Watchlist}/>
        <PrivateRoute exact path="/preferences" component={Preferences}/>
        <Route exact path="/" component={HomeScreen}/>
        <Route exact path="/about" component={AboutScreen}/>
        <Route exact path="/login" component={LoginScreen}/>
        <Route exact path="/register" component={RegisterScreen}/>
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
        <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen}/>
      </Switch>
    </div>
  </Router>);
}

export default App;
