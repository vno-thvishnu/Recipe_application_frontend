import React, { useState } from "react";
import "./WelcomePage.css";
// import Logo from "../img/logo2.png";
import { Outlet } from "react-router-dom";
import pic from "../Assets/welcomebg.png"

const WelcomePage = () => {
  // const [isSignUp, setIsSignUp] = useState(false);

  // const [data, setData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   username: "",
  //   password: "",
  //   confirmpassword: "",
  // });

  // const [confirmPass, setConfirmPass] = useState(true);

  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isSignUp) {
  //     if (data.password !== data.confirmpassword) {
  //       setConfirmPass(false);
  //     }
  //   }
  // };
  // const resetForm = () => {
  //   setConfirmPass(true);
  //   setData({
  //     firstname: "",
  //     lastname: "",
  //     username: "",
  //     password: "",
  //     confirmpassword: "",
  //   });
  // };
  return (
    <div className="Auth">
      <div className="a-left">
        {/* <img src={Logo} /> */}
        <div className="form-container">
        <Outlet />
      </div>
        <div className="Webname">
          <h1>Hello Chef's</h1>
          {/* <h6>You will become a chef</h6> */}
          <h6>Read. Cook. Eat.</h6>

        </div>
      </div>
     
      <div>
        <img src={pic}/>
      </div>
    </div>
  );
};

export default WelcomePage;
