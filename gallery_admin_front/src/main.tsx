import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import AuthInitializer from "./components/AuthInitializer";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthInitializer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthInitializer>
  </Provider>,
);
