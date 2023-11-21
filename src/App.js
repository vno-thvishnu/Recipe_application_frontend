import logo from './logo.svg';
import './App.css';
import "./Authentication/InputStyles.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './Authentication/WelcomePage';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Home from './Home/Home';
import Post from './Component/Posts/Post';
import Profile from './Component/Profile/Profile';
import OtherProfile from './Component/Posts/OtherProfile';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage/>}>
            <Route path="/" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
          </Route>
          <Route path="/home" element={<Home/>} >
          <Route path="/home" element={<Post/>} />
          <Route path="/home/profile" element={<Profile/>} />
          <Route path="/home/view/:userId" element={<OtherProfile/>} />

          </Route>
          {/* <Route path="/profile/update/:id" element={<ProfileModal/>} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
