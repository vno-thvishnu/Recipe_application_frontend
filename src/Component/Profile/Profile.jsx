import React, { useContext, useState } from 'react'
import { UserContext } from '../../UseContext';
import dpic from "../../Assets/dprofile.png";
import dcover from "../../Assets/dcover.png";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import "./Profile.css"
import Post from '../Posts/Post';
import Card from '../ProfileModel/Card';
import ProfileModal from '../ProfileModel/ProfileModal';
import { useNavigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { MdFoodBank } from "react-icons/md";
import CreateRecipe from '../ProfileModel/CreateRecipe';
import { MdTipsAndUpdates } from "react-icons/md";
import { IoAppsSharp } from "react-icons/io5";



function Profile() {

    // const navigate= useNavigate()
    const { loginUser } = useContext(UserContext);
// console.log(loginUser)
    const [modalOpen, setModalOpen] = useState(false);
    const [createRecipeModal,setCreateRecipeModal]=useState(false)
  return (
    <>
  <div className='profile_overall'>
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
            <span><span>Bio: </span>{loginUser.bio}</span>
        </div>
        <div className='Follow'>
            <span><span>Working As: </span>{loginUser.workingAs}</span>
        </div>
        {/* <hr />

        <div>
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
          setModalOpen(true);
        // navigate(`/profile/update/${loginUser._id}`)
        }}
      >
        Update <MdTipsAndUpdates  />
      </span>


      



    </div>

    <div className='posts'>
       <div>
       {/* <h5 className='edita'>Your Posts</h5> */}
       {/* <IoAppsSharp /> */}
        <span
        className="edit"
        onClick={() => {
          setCreateRecipeModal(true);
        // navigate(`/profile/update/${loginUser._id}`)
        }}
      >
        Create Recipe <MdFoodBank/> 
      </span>
       </div>
<Card/>

    </div>
  </div>



      {/* <MantineProvider> */}

      <ProfileModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          // loginUser={loginUser}
          
        />
        <CreateRecipe
        modalOpen={createRecipeModal}
        setModalOpen={setCreateRecipeModal}
        loginUser={loginUser}/>
        
        {/* </MantineProvider> */}
  </>
  )
}

export default Profile