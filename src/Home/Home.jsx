import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../ApiRequest/ApiRequest";
// import LogoSearch from "../Components/LogoSearch/LogoSearch";
import { UserContext } from "../UseContext";
import "./Home.css";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Profile from "../Component/Profile/Profile";
import Post from "../Component/Posts/Post";
// import Logo from "../img/logo2.png";

const Home = () => {
  const { setLoginUser } = useContext(UserContext);

  const navigate = useNavigate();

 
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    setLoadingData(false);

    const refreshUser = async () => {
      try {
        const localId = localStorage.getItem("ticket");

        const get = await getUser(localId);

        setLoginUser(get.data.otherDetails);
        setLoadingData(true);
      } catch (error) {
        console.log(error);
      }
    };
    refreshUser();
  }, []);

//   console.log(localStorage.getItem("key"));
//   console.log(localStorage.getItem("ticket"));
  return (
    <>
      {loadingData ? (
        <>
          <div className="HomeParent">
           <Navbar/>
            <div className="Home">
             {/* <Post/> */}
             {/* <Profile/> */}
             <Outlet/>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {localStorage.ticket === undefined ? (
        <>
          <div className="securityerr">
            <div className="a-left">
              {/* <img src={Logo} /> */}
              <div className="Webname">
                <h1>Hello Chef's</h1>
                {/* <h6>You will become a Chef</h6> */}
                <h6>Read. Cook. Eat.</h6>

              </div>
            </div>
            <h2
              onClick={() => {
                navigate("/");
              }}
            >
              Go Back, Login Again !
            </h2>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
