import './App.css';
import Login from "./Login form/login";
import SignUp from "./Login form/signup";
import Home from "./Pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/signup' element={<SignUp/>}></Route>
              <Route path='/home' element={<Home/>}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
