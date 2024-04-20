import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
