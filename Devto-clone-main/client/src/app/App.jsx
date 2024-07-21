// Contexts & Providers
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "../context/SocketContext";

// Stores
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../core/store";

// Routes
import Routes from "./Routes";

// Components
import CustomToastContainer from "../common/CustomToastContainer";

// Resets
import GlobalReset from "../global/GlobalReset";
import GlobalTypography from "../global/GlobalTypography";
import "../styles/index.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>
      <Router>
        <Provider store={store}>
          <SocketProvider>
            <PersistGate loading={null} persistor={persistor}>
              <GlobalReset />
              <GlobalTypography />
              <CustomToastContainer />
              <Routes />
            </PersistGate>
          </SocketProvider>
        </Provider>
      </Router>
    </>
  );
};

export default App;
