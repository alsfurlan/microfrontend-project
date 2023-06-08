import Header from "./components/Header";
import { lazy, Suspense, useState, useEffect } from "react";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Progress from "./components/Progress";
import { createBrowserHistory } from "history";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const MarketingAppLazyLoading = lazy(() => import("./components/MarketingApp"));
const AuthAppLazyLoading = lazy(() => import("./components/AuthApp"));
const DashboardLazyLoading = lazy(() => import("./components/DashboardApp"));
const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const setIsSignedInLocalStorage = (signInValue) => {
    setIsSignedIn(signInValue);
    localStorage.setItem('isSignedIn', `${signInValue}`);
  }

  useEffect(() => {
    const result = localStorage.getItem('isSignedIn') === 'true';
    setIsSignedIn(result);
  }, [])

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header
            onSignOut={() => setIsSignedInLocalStorage(false)}
            isSignedIn={isSignedIn}
          />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazyLoading onSignIn={() => setIsSignedInLocalStorage(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && <Redirect to="/" />}
                <DashboardLazyLoading />
              </Route>
              <Route path="/" component={MarketingAppLazyLoading}></Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  );
};
