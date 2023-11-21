import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getUser, getUserRecipeOnly } from '../../ApiRequest/ApiRequest';
import dpic from "../../Assets/dprofile.png";
import dcover from "../../Assets/dcover.png";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import OtherPreviewRecipe from './OtherPreviewRecipe';

function OtherProfile() {

  const { userId } = useParams();
console.log(userId)
  const [loadingData, setLoadingData] = useState(true);
const [displayData, SetDisplayData]=useState([]);
const [postData,setPostData]=useState([]);
const [previewModal, setPreviewModal] = useState(false);
const [id, setId] = useState("");


  useEffect(() => {
        setLoadingData(true);
console.log(userId)
const viewUser = async () => {
  try {

    const get = await getUser(userId);
if(get.data.message === "finded"){
SetDisplayData(get.data.otherDetails);

}
  } catch (error) {
    console.log(error);
  }
};
        
        viewUser();
        const getUserRecipe = async () => {
          try {
    
            const get = await getUserRecipeOnly(userId);
    if(get.data.message === "finded"){
      setPostData(get.data.find.reverse());
    
    }
    setLoadingData(false);

          } catch (error) {
            console.log(error);
          }
        };
        getUserRecipe()
              
      },userId);
    
  return (
   <>
   {
loadingData?<> 
   <div class="loader">
            <i class="loader-el"></i>
            <i class="loader-el"></i>
          </div>
 </>:


<>
<div className='profile_overall'>
  <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={displayData.coverImage === "" ? dcover : displayData.coverImage}
          alt=""
        />
        <img
          src={displayData.profileImage === "" ? dpic : displayData.profileImage}
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {displayData.userName}
        </span>
      </div>
      <div className="FollowStatus">
        <hr />
        <div className='Follow'>
            <span><span>Bio: </span>{displayData.bio}</span>
        </div>
        <div className='Follow'>
            <span><span>Working As: </span>{displayData.workingAs}</span>
        </div>
        {/* <hr />

        <div>
          <div className="Follow">
            <span>{displayData.following.length}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="Follow">
            <span>{displayData.followers.length}</span>
            <span>Followers</span>
          </div>
        </div> */}
        <hr />
      </div>
    


    </div>

    <div className='posts'>
       <div>
       <h5 className='edita'>Recipe's</h5>
       {/* <IoAppsSharp /> */}
      
       </div>
{/* <Card/> */}
<div className='cardbg'>
  {postData.length===0?<><h2>No posts</h2></>:<>
   {
    postData.map((get,index)=>(
    
     <>
   {get.private===false &&      <div className='card' 
        onClick={()=>{
          setId(get._id);
          setPreviewModal(true)}}>
      <img 
      src={get.recipeImage}
      />
      <div className='float'>
<p >
  {get.title}
</p>
{get.private===true?<><span>
  <IoIosEyeOff />
  </span></>:<>
  <span><IoIosEye /></span>
  </>}

      </div>

     {get._id===id ? <>
     <OtherPreviewRecipe
      get={get}
  previewModal={previewModal}
  setPreviewModal={setPreviewModal}/>
  </>:""
}

    </div>
      }
     
     </>
    ))
   }
   </>}
  </div>
    </div>
  </div>


</>

   }
   </>
  )
}

export default OtherProfile