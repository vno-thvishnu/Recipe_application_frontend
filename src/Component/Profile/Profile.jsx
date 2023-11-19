import React, { useContext, useState } from 'react'
import { UserContext } from '../../UseContext';
import dpic from "../../Assets/dprofile.png";
import dcover from "../../Assets/dcover.png";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import "./Profile.css"
import Post from '../Posts/Post';
import Card from '../Posts/Card';
import ProfileModal from '../ProfileModel/ProfileModal';
import { useNavigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';



function Profile() {

    // const navigate= useNavigate()
    const { loginUser } = useContext(UserContext);
// console.log(loginUser)
    const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={loginUser.coverImage === "" ? dcover : loginUser.coverImage}
          alt=""
        />
        <img
          src={loginUser.profileImage === "" ? dpic : loginUser.profileImage}
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {loginUser.userName}
        </span>
      </div>
      <div className="FollowStatus">
        <hr />
        <div className='Follow'>
            <span>{loginUser.bio}</span>
        </div>
        <div className='Follow'>
            <span>{loginUser.workingAs}</span>
        </div>
        {/* <div>
          <div className="Follow">
            <span>{loginUser.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="Follow">
            <span>{loginUser.followers.length}</span>
            <span>Followers</span>
          </div>
        </div> */}
        <hr />
      </div>
      <span
        className="edit"
        onClick={() => {
          setModalOpen(true);console.log("check");
        // navigate(`/profile/update/${loginUser._id}`)
        }}
      >
        Update <MdOutlineTipsAndUpdates />
      </span>


      

<div className='Posts'>
        <h5>Recipe's</h5>
<Card/>

    </div>
    <MantineProvider>

    <ProfileModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          loginUser={loginUser}
        />
        </MantineProvider>
    </div>

  
  </>
  )
}

export default Profile