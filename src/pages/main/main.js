import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Header from "./header";
import * as routes from "../../routes";

const ChoosePizzaSize = lazy(() =>
  import("../choose-pizza-size/choose-pizza-size.js")
);
const ChoosePizzaFlavors = lazy(() =>
  import("../choose-pizza-flavours/choose-pizza-flavours.js")
);

const ChoosePizzaQuantity = lazy(() =>
  import("../choose-pizza-quantity/choose-pizza-quantity.js")
);

const Checkout = lazy(() => import("../checkout/checkout.js"));

const CheckoutConfirmation = lazy(() =>
  import("../checkout-confirmation/checkout-confirmation.js")
);

const CheckoutSuccess = lazy(() =>
  import("../checkout-success/checkout-success.js")
);

const Main = () => (
  <>
    <Header />

    <Spacer />
    <Suspense fallback="Loading...">
      <Switch>
        <Route path={routes.HOME} exact component={ChoosePizzaSize} />
        <Route
          path={routes.CHOOSE_PIZZA_FLAVORS}
          component={ChoosePizzaFlavors}
        />
        <Route
          path={routes.CHOOSE_PIZZA_QUANTITY}
          component={ChoosePizzaQuantity}
        />
        <Route path={routes.CHECKOUT} exact component={Checkout} />
        <Route
          path={routes.CHECKOUT_CONFIRMATION}
          component={CheckoutConfirmation}
        />
        <Route path={routes.CHECKOUT_SUCCESS} component={CheckoutSuccess} />
      </Switch>
    </Suspense>
  </>
);

const style = (theme) => ({ main: theme.mixins.toolbar });

const SpacerWrapper = ({ classes }) => <div className={classes.main} />;

const Spacer = withStyles(style)(SpacerWrapper);

export default Main;
