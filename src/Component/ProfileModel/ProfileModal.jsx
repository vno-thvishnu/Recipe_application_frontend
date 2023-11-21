import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { removeImage, UpdateUser } from "../../ApiRequest/ApiRequest";
import { UserContext } from "../../UseContext";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "../../Loading.css"


function ProfileModal({ modalOpen, setModalOpen }) {
  const aRefone = useRef(null);
  const aReftwo = useRef(null);
  // const aRefthree = useRef(null);


  const { setLoginUser, loginUser } = useContext(UserContext);
  const theme = useMantineTheme();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  useEffect(() => {
    setProfileImage(null);
    setCoverImage(null);
  }, [modalOpen]);
  useEffect(() => {
    setFormData(loginUser);
    setProfileImagePreview(loginUser.profileImage)
    setCoverImagePreview(loginUser.coverImage)
    // if(loginUser.profileImage!==""){
    //   setProfileImage(true)
    // }

  }, [loginUser]);
  // console.log(loginUser)
  // console.log(loginUser.workingAs)
  // console.log(loginUser.bio)



  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);

      event.target.name === "profileImage"
        ? setProfileImagePreview(URL.createObjectURL(img))
        : setCoverImagePreview(URL.createObjectURL(img));
    }
  };

  const userNameHandleChange=(e)=>{
    // let data=e.target.value
    setFormData({...formData,userName:e.target.value});
  
  }
  const bioHandleChange=(e)=>{
    setFormData({...formData,bio:e.target.value});
    
  }
  const workingAsHandleChange=(e)=>{
    setFormData({...formData,workingAs:e.target.value});
    
  }
  // const preset_key = "hswixg5v";
  const preset_key = "pwfoxhd9";

  const cloud_name = "dor3vskgy";

  const handleSubmit = async (event) => {
    setButtonLoading(true);
    event.preventDefault();

    let UserData = formData;

    if (profileImage) {
      const convertPic = new FormData();
      convertPic.append("file", profileImage);
      convertPic.append("upload_preset", preset_key);

      try {
        if (UserData.profileImage !== "") {
          const userId = UserData._id;
          const sendData = {
            profileImage_publicId: UserData.profileImage_publicId,
          };

         await removeImage(userId, sendData);
        }

        const server = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          convertPic
        );

        // const updatedata = {
        //   currentUserId: UserData._id,
        //   profileImage: server.data.secure_url,
        //   profileImage_publicId: server.data.public_id,
        // };
      
            UserData=({...UserData, 
              profileImage: server.data.secure_url,
              profileImage_publicId: server.data.public_id});
        const update = await UpdateUser(UserData._id, UserData);
        // aRefone.current.value = null;
        // setProfileImage(null);
        setLoginUser(update.data.otherDetails);

        if(!coverImage){

          if (update.data.message === "Updated successfully") {
              toast.success(update.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            
              setButtonLoading(false);
              setTimeout(() =>setModalOpen(false), 5500);
             
            }  else if (
              update.data.message === "Try another username" 
            ) {
              toast.error(update.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setButtonLoading(false);
            }
        }
      
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const convertPic = new FormData();
      convertPic.append("file", coverImage);
      convertPic.append("upload_preset", preset_key);
      try {
        if (UserData.coverImage !== "") {
          const sendData = {
            coverImage_publicId: UserData.coverImage_publicId,
          };
         await removeImage(UserData._id, sendData);
        }

        const server = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          convertPic
        );
        // const updatedata = {
        //   currentUserId: UserData._id,
        //   coverImage: server.data.secure_url,
        //   coverImage_publicId: server.data.public_id,
        // };
        UserData=({...UserData, 
          coverImage: server.data.secure_url,
          coverImage_publicId: server.data.public_id});
    
        const update = await UpdateUser(UserData._id, UserData);
        // aReftwo.current.value = null;
        // setCoverImage(null);
        setLoginUser(update.data.otherDetails);

        if (update.data.message === "Updated successfully") {
            toast.success(update.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          
            setButtonLoading(false);
            setTimeout(() =>setModalOpen(false), 5500);
           
          }else if (
            update.data.message === "Try another username" 
          ) {
            toast.error(update.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setButtonLoading(false);
          }
      } catch (error) {
        console.log(error);
      }
    }
if(profileImage===null && coverImage==null){
  try {
    const update = await UpdateUser(UserData._id, UserData);
   
    // console.log(update.data.message)
    setLoginUser(update.data.otherDetails);

    if (update.data.message === "Updated successfully") {
      toast.success(update.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    
      setButtonLoading(false);
      setTimeout(() =>setModalOpen(false), 5500);
     
    } else if (
      update.data.message === "Try another username" 
    ) {
      toast.error(update.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setButtonLoading(false);
    }

  } catch (error) {
    console.log(error);
    
  }
}
    setButtonLoading(false);
  };

  return (
 <Modal
 overlayColor={
  theme.colorScheme === "dark"
    ? theme.colors.dark[9]
    : theme.colors.gray[2]
}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <form className="inputform bpad">
        <h3>Your Info</h3>
        <h6>User Name</h6>
        <div className="Inputpair">
            <input
              className="Input"
              type="text"
              placeholder={loginUser.userName}
              name="userName"
              // value={setFormData.userName}
              onChange={userNameHandleChange}
           />
          </div>
          <h6>Profile Image</h6>
        {profileImagePreview!=="" && <img className="pimg" src={profileImagePreview} />}
        <div className="Input nopad">
          <input
            type="file"
            className="choose_file"
            ref={aRefone}
            name="profileImage"
            onChange={onImageChange}
          />
        </div>
        <h6>Cover Image</h6>
        {coverImagePreview!=="" && <img className="cimg" src={coverImagePreview} />}
        <div className="Input nopad">
          <input
            type="file"
            className="choose_file"
            ref={aReftwo}
            name="coverImage"
            onChange={onImageChange}
          />
        </div>
        <h6>Bio</h6>
          <div className="Inputpair">
            <input
              className="Input"
              type="text"
              placeholder={loginUser.bio===""?"type about self":formData.bio}
              name="bio"
              onChange={bioHandleChange}
          
            />
          
          </div>
        <h6>Working As</h6>

          <div className="Inputpair">
            <input
              className="Input"
              type="text"
              placeholder={loginUser.workingAs===""?"chef, cook, & housewife etc.. ":formData.workingAs}
              name="workingAs"
              onChange={workingAsHandleChange}
          
            />
          
          </div>
    
        {buttonLoading ? (
          <div class="loader">
            <i class="loader-el"></i>
            <i class="loader-el"></i>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            type="submit"
            className="button InputButton"
          >
            Update
          </button>
        )}
      </form>
      {/* <ToastContainer
        transition={Bounce}
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
    </Modal>
   
  );
}
export default ProfileModal;
