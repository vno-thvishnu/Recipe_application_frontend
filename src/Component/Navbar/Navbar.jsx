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
                  {/* <h6>You will become a Chef</h6> */}
                  <h6>Read. Cook. Eat.</h6>

                </div>
              </div>
              <div className="navpair" >
  <Link to='/home'
 style={{transition:"width 1s"}} 
 className='buttonfontsize link_tag'>Community</Link></div>
              <div className="navpair">
  <Link to='/home/profile'
 style={{transition:"width 1s"}} 
 className='buttonfontsize  link_tag
 '>Profile</Link></div> 
        
              <div className="navpair">
                {/* <LogoSearch /> */}
                <h3 className='buttonfontsize link_tag' onClick={removeLocalstorgae}>
                  LogOut <SlLogout />
                </h3>
              </div>
            </div>
     
    </>
  )
}

export default Navbar