import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { createRecipe, getUserRecipeOnly, removeImage, UpdateUser } from "../../ApiRequest/ApiRequest";
import { UserContext } from "../../UseContext";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "../../Loading.css"


function CreateRecipe({ modalOpen, setModalOpen, loginUser }) {
    const navigate = useNavigate();



  const { setLoginUser ,setData} = useContext(UserContext);
  const theme = useMantineTheme();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [check,setCheck]=useState(true);

  useEffect(() => {
    formik.setFieldValue('private', `${check}`);
  }, [check]);

  const formik = useFormik({
    initialValues: {
     title:"",
     recipe:"",
     recipeImage:"",
     private:`${check}`,
     profileImage:loginUser.profileImage,
     userId:loginUser._id,
     userName:loginUser.userName,
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
        const createAcc = await createRecipe(values);

        if (createAcc.data.message === "Recipe Created Successfully") {
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
          setCheck(true)

          setTimeout(() =>setModalOpen(false), 5500);
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

  useEffect(() => {
    formik.setFieldValue('private', `${check}`);
  }, [check]);

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
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <form className="inputform bpad">
        <h3>Create Recipe</h3>
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
              value={formik.values.private}
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
              onClick={()=>{setCheck(false);console.log(false)}}
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
           Create
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
export default CreateRecipe;
