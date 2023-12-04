import "./App.scss";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <div className="App">
        <Outlet />
      </div>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
