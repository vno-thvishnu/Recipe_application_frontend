import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { createRecipe, editRecipe, getUserRecipeOnly, removeImage, UpdateUser } from "../../ApiRequest/ApiRequest";
import { UserContext } from "../../UseContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "../../Loading.css"
import { IoArrowBackCircle } from "react-icons/io5";

function EditRecipe({ get, setOpenEdit }) {
    const navigate = useNavigate();



  const { loginUser ,setData} = useContext(UserContext);
  const theme = useMantineTheme();
  const [buttonLoading, setButtonLoading] = useState(false);
//   const [check,setCheck]=useState(true);
  const [isChecked, setIsChecked] = useState("");
  useEffect(() => {
    setIsChecked(!get.private)
    formik.setValues(get);
  }, []);
//   useEffect(() => {
//     formik.setFieldValue('private', `${isChecked}`);
//   }, [isChecked]);

  const formik = useFormik({
    initialValues: {
     title:"",
     recipe:"",
     recipeImage:"",
     private:"",
     userId:loginUser._id,
    },
    validate: (values) => {
      let error = {};

      if (values.title === "") {
        error.title = "please enter title";
      }
      if (
        values.title &&
        (values.title.length <= 2 || values.title.length > 30)
      ) {
        error.title = "Title must be between 3 to 30 characters";
      }
      if (values.recipe === "") {
        error.recipe = "please enter Ingredients & Recipe";
      }
      if (values.recipeImage === "") {
        error.recipeImage = "please enter Picture Url";
      }
    
      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);
        const createAcc = await editRecipe(get._id,values);

        if (createAcc.data.message === "Updated Successfully") {
          toast.success(createAcc.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setData(createAcc.data.findall.reverse())
          setTimeout(() => formik.resetForm(), 3000);
          setButtonLoading(false);
        //   setCheck(true)

          setTimeout(() =>setOpenEdit(false), 5500);
        } else if (
          createAcc.data.message === "You already created this title, Try another" 
        ) {
          toast.error(createAcc.data.message, {
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
        alert("error");
      }
    },
  });
  const handleCheckboxChange = (event) => {
    if(isChecked===true){
        setIsChecked(false);

    }else{
        setIsChecked(true);

    }
    // console.log(isChecked)
    formik.setFieldValue('private', `${isChecked}`);

    
  };
//   useEffect(() => {
//     formik.setFieldValue('private', `${isChecked}`);
//   }, [isChecked]);

  return (
<>

<form className="inputform bpad">
<div className="inputtop">
      <h3>Edit Recipe</h3>
<div>
<span className="edit" onClick={()=>setOpenEdit(false)}><IoArrowBackCircle /> Back</span>
</div>
      </div>
        <div className="Inputpair">
            <input
              className="Input inplg"
              type="text"
              placeholder="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={`
                  ${
                    formik.touched.title && formik.errors.title
                      ? "error-box"
                      : ""
                  }
                  ${
                    formik.touched.title && !formik.errors.title
                      ? "success-box"
                      : ""
                  }

                  `}
            />
            {formik.touched.title && formik.errors.title ? (
              <span className="err">{formik.errors.title} </span>
            ) : null}
          </div>
         
          <div className="Inputpair">
            <input
              className="Input inplg"
              type="text"
              placeholder="Picture Url"
              name="recipeImage"
              value={formik.values.recipeImage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={`
                  ${
                    formik.touched.recipeImage && formik.errors.recipeImage
                      ? "error-box"
                      : ""
                  }
                  ${
                    formik.touched.recipeImage && !formik.errors.recipeImage
                      ? "success-box"
                      : ""
                  }

                  `}
            />
            {formik.touched.recipeImage && formik.errors.recipeImage ? (
              <span className="err">{formik.errors.recipeImage} </span>
            ) : null}
          </div>
         
          <div className="Inputpair">
            <textarea
             rows="14" 
              className="Input inplg"
              type="text"
              placeholder="Ingredients & Recipe"
              name="recipe"
              value={formik.values.recipe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={`
                  ${
                    formik.touched.recipe && formik.errors.recipe
                      ? "error-box"
                      : ""
                  }
                  ${
                    formik.touched.recipe && !formik.errors.recipe
                      ? "success-box"
                      : ""
                  }

                  `}
            />
            {formik.touched.recipe && formik.errors.recipe ? (
              <span className="err">{formik.errors.recipe} </span>
            ) : null}
          </div>
          <div className="Inputpair checkbox">
<div>
            <input
             rows="14" 
              className="Input"
              type="checkbox"
              placeholder="Ingredients & Recipe"
              name="private"
            //   value={formik.values.private}
            checked={isChecked}
            onChange={handleCheckboxChange}
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   onClick={()=>{setCheck(false);console.log(false)}}
              id={`
                  ${
                    formik.touched.private && formik.errors.private
                      ? "error-box"
                      : ""
                  }
                  ${
                    formik.touched.private && !formik.errors.private
                      ? "success-box"
                      : ""
                  }

                  `}
            />
<label >Share with community</label>


</div>
            {formik.touched.private && formik.errors.private ? (
              <span className="err">{formik.errors.private} </span>
            ) : null}
          </div>


        {buttonLoading ? (
          <div class="loader">
            <i class="loader-el"></i>
            <i class="loader-el"></i>
          </div>
        ) : (
          <button
            onClick={formik.handleSubmit}
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
</>
   
   
  );
}
export default EditRecipe;
