import Header from "./components/Header";
import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const MarketingAppLazyLoading = lazy(() => import("./components/MarketingApp"));
const AuthAppLazyLoading = lazy(() => import("./components/AuthApp"));
const DashboardLazyLoading = lazy(() => import('./components/DashboardApp'));

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthAppLazyLoading onSignIn={() => setIsSignedIn(true)}/>
              </Route>
              <Route path="/dashboard" component={DashboardLazyLoading}/>
              <Route path="/" component={MarketingAppLazyLoading}></Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  );
};
