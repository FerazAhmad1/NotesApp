import "./App.css";
// import Login from './components/Login'
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Requireauth from "./components/Requireauth";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/notes"
          element={
            <Requireauth>
              <Notes />
            </Requireauth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
