import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UseContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "../../Loading.css"


function OtherPreviewRecipe({get, previewModal, setPreviewModal }) {
    const navigate = useNavigate();

    

  const { setLoginUser,loginUser ,setData} = useContext(UserContext);
  const theme = useMantineTheme();


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
      onClose={() => {setPreviewModal(false)}}
    >
    
      <form className="inputform bpad">
      <div className="inputtop">
      <h3>{get.title}</h3>

      </div>
   
       
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
 
      
    </form>
 
   

     
    </Modal>
   
  );
}
export default OtherPreviewRecipe;




  