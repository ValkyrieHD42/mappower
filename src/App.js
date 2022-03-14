import './App.css';
import Map from "./components/Map";
import SideBar from "./components/Sidebar";
import {useState} from "react";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import coodinatesReducer from "./features/coodinates";

const store = configureStore({
    reducer: {
        coordniates: coodinatesReducer,
    }
})

function App() {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);

    function handleStartUpdate(event) {
        setStart(event.value);
    }
    function handleEndUpdate(event) {
        setEnd(event.value);
    }

    return (
    <div className="App">
        <Provider store={store} >
          <SideBar updateStartPoint={handleStartUpdate} updateEndPoint={handleEndUpdate}/>
          <Map startPoint={start} endPoint={end} />
        </Provider>
    </div>
  );
}

export default App;
