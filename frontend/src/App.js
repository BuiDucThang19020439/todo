// import Router from './Router/Router';
import "./App.css";
import Home from "./layout/home/Home";
import { Provider } from "react-redux";
import store from "./reducer/store.js";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App;
