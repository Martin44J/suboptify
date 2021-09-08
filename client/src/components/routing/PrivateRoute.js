import {Redirect, Route} from "react-router-dom";

//looks more complicated than it is. Basically this is a reusable template for a private route.
//If it finds the authentication token, then it will send you to the right page, otherwise it redirects to the login.

const PrivateRoute = ({component:Component, ...rest}) =>{
    return (
        <Route
          {...rest}
          render={(props) =>
            localStorage.getItem("authToken") ? (
              <Component {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      );
}

export default PrivateRoute;