import "dotenv/config";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { Redirect } from "react-router";
import t from "prop-types";
import { HOME, LOGIN } from "./routes";
import useAuth from "./hooks/auth";
// eslint-disable-next-line
import FirebaseApp from "./services/firebase"
const MainPage = lazy(() => import("./pages/main/main"));
const Login = lazy(() => import("./pages/login/login"));

function App({ location }) {
  const { userInfo, setUserInfo } = useAuth();
  const [didCheckUserIn, setDidCheckUserIn] = useState(false);
  const { isUserLoggedIn } = userInfo;

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      setUserInfo({
        isUserLoggedIn: !!user,
        user: user && {
          ...user,
          firstName: user.displayName?.split(" ")[0],
        },
      });
      setDidCheckUserIn(true);
    });

  
  }, [setUserInfo]);

  if (!didCheckUserIn) {
    return <LinearProgress />;
  }

  if (isUserLoggedIn && location.pathname === LOGIN) {
    return <Redirect to={HOME} />;
  }

  if (!isUserLoggedIn && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path={LOGIN} component={Login} />
        <Route component={MainPage} />
      </Switch>
    </Suspense>
  );
}

App.propTypes = {
  location: t.object.isRequired,
};

export default App;
