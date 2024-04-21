import './App.css';
import Home from './components/home/Home';
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/header";

function App() {
  return (
      <>
          <BrowserRouter>
              <Header/>
              <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/home" element={<Home />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
