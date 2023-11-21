import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { createRecipe, dltRecipe, getUserRecipeOnly, removeImage, UpdateUser } from "../../ApiRequest/ApiRequest";
import { UserContext } from "../../UseContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "../../Loading.css"
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";

function PreviewRecipe({get, previewModal, setPreviewModal }) {
    const navigate = useNavigate();

    

  const { setLoginUser,loginUser ,setData} = useContext(UserContext);
  const theme = useMantineTheme();

const[openEdit,setOpenEdit]=useState(false)
const[openDlt,setOpenDlt]=useState(false)

useEffect(() => {
  setOpenEdit(false)
      }, []);
  return (
 <Modal
 overlayColor={
  theme.colorScheme === "dark"
    ? theme.colors.dark[9]
    : theme.colors.gray[2]
}
      overlayOpacity={0.55}
      overlayBlur={3}
      size="80%"
      opened={previewModal}
      onClose={() => {setPreviewModal(false);setOpenEdit(false)}}
    >
     {!openEdit?
      <form className="inputform bpad">
      <div className="inputtop">
      <h3>{get.title}</h3>
<div>
<span className="edit" onClick={()=>setOpenEdit(true)}><FaEdit /> Edit</span>
<span className="edit" onClick={()=>{setOpenEdit(true);setOpenDlt(true)}}><MdDelete /> Delete</span>
</div>
      </div>
      {/* <div className="Inputpair">
          <input
            className="Input inplg"
            type="text"
            placeholder="Title"
            name="title"
            value={get.title}
          />
         
        </div> */}
       
        {/* <div className="Inputpair">
          <input
            className="Input inplg"
            type="text"
            placeholder="Picture Url"
            name="recipeImage"
            value={formik.values.recipeImage}
          
          />

        </div> */}
       
        <div className="Inputpair">
          <textarea
           rows="14" 
            className="Input inplg"
            type="text"
            placeholder="Ingredients & Recipe"
            name="recipe"
            value={get.recipe}
          />
        
        </div>
        <div className="Inputpair checkbox">
{/* <div>
          <input
           rows="14" 
            className="Input"
            type="checkbox"
            placeholder="Ingredients & Recipe"
            name="private"
            value={get.private}
          />
<label >Share with community</label>


</div> */}
        </div>
      
    </form>
 
     :
<>
{openDlt?
  <DeleteRecipe get={get} setPreviewModal={setPreviewModal} setOpenEdit={setOpenEdit} setOpenDlt={setOpenDlt} />
  :
  <EditRecipe get={get} setOpenEdit={setOpenEdit}/>

}
</>

     }
    </Modal>
   
  );
}
export default PreviewRecipe;




  