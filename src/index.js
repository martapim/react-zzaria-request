import React from "react";
import ReactDOM from "react-dom";
import Root from "./root";
import reportWebVitals from "./reportWebVitals";

import ErrorBoundary from "./error";

ReactDOM.render(
  <ErrorBoundary>{(hasError) => <Root hasError={hasError} />}</ErrorBoundary>,
  document.getElementById("root")
);

reportWebVitals();
