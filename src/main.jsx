import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import stores from "./app/Stores.jsx";
import AuthContext from "./context/AuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={stores}>
    <AuthContext>
      <App />
    </AuthContext>
  </Provider>
);
