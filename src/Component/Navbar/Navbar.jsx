import React from 'react'
import "../../Home/Home.css";
import "./Navbar.css"
import { SlLogout } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";



function Navbar() {
  const navigate = useNavigate();

    const removeLocalstorgae = () => {
        navigate("/");
    
        localStorage.removeItem("ticket");
        // localStorage.removeItem("key");
      };
  return (
    <>
     <div className="Navbar">
              <div className="logohide">
                {/* <img src={Logo} /> */}
                <div className="Webname">
                  <h1 style={{ "background-color":"white"}}>Hello Chef's</h1>
                  <h6>You will become a Chef</h6>
                </div>
              </div>
              <div className=' flex justify-center items-center  bg-[#1b1c1e] '>
  <Link to='/home/profile'
 style={{transition:"width 1s"}} 
 className='buttonfontsize  link_tag
 font-inter font-medium bg-[#6469ff]
 text-white px-4 py-1 rounded-md '>Profile</Link></div> 
        <div className=' flex justify-center items-center  bg-[#1b1c1e] '>
  <Link to='/home'
 style={{transition:"width 1s"}} 
 className='buttonfontsize  font-inter link_tag font-medium bg-[#6469ff]
 text-white px-4 py-1 rounded-md '>Coumminty</Link></div> 
              <div className="navpair">
                {/* <LogoSearch /> */}
                <h3 onClick={removeLocalstorgae}>
                  LogOut <SlLogout />
                </h3>
              </div>
            </div>
     
    </>
  )
}

export default Navbar