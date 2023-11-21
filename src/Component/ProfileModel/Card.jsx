import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../../UseContext';
import { useState } from 'react';
import { getUserRecipeOnly } from '../../ApiRequest/ApiRequest';
import { useEffect } from 'react';
// import { download } from '../assets'
// import { downloadImage } from '../utils' 
// import {style} from "./Card.module.css"
import  "./Card.css"
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import PreviewRecipe from './PreviewRecipe';
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";



const Card = ({_id,userName,title,photo}) => {

  const { loginUser , 
    data,setData,forLoad,setForLoad} = useContext(UserContext);

  const [loadingData, setLoadingData] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [id, setId] = useState("");


  useEffect(() => {
//     setLoadingData(false);

//     const getUserRecipe = async () => {
//       try {

//         const get = await getUserRecipeOnly(loginUser._id);
// if(get.data.message === "finded"){
//   setData(get.data.find);

// }
//         setLoadingData(true);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getUserRecipe();
// const toast=()=>{
          
           if(forLoad!==""){
            toast.success("Recipe deleted Successfull", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setForLoad("")
           }
// }

// toast()
  }, [forLoad]);

  useEffect(() => {
    setLoadingData(false);

    const getUserRecipe = async () => {
      try {

        const get = await getUserRecipeOnly(loginUser._id);
if(get.data.message === "finded"){
  setData(get.data.find.reverse());

}
        setLoadingData(true);
      } catch (error) {
        console.log(error);
      }
    };
    getUserRecipe();
  }, []);

  return (
   <>
  <div className='cardbg'>
  {data.length===0?<><h2>No posts</h2></>:<>
   {
    data.map((get,index)=>(
    
     <>
        <div className='card' 
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
{/* <div className='mt-5 flex justify-between items-center gap-2'>
  <div className='flex items-center gap-2'>
<div className='w-7 h-7 rounded-full object-cover bg-green-700 flex
justify-center items-center text-white text-xs font-bold'>
{get.userName}

</div>
<p className='text-white text-sm'>{userName}</p>
  </div>
  <button type='button' 
  // onClick={()=>downloadImage(_id,photo)}
  className="outline-none bg-transparent border-none">
    <img 
    // src={download}
     alt="download" className='w-6 h-6 object-contain invert'/>
  </button>
</div> */}
      </div>

     {get._id===id ? <>
     <PreviewRecipe
      get={get}
  previewModal={previewModal}
  setPreviewModal={setPreviewModal}/>
  </>:""
}

    </div>
      
     
     </>
    ))
   }
   </>}
  </div>
  <ToastContainer
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
      />

   </>
  )
}

export default Card