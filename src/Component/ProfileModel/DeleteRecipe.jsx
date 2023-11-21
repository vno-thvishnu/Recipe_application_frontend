import React, { useContext } from "react";
import { useState } from "react";
import { dltRecipe } from "../../ApiRequest/ApiRequest";
import { UserContext } from "../../UseContext";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { dRecipe } from "./PreviewRecipe";

function DeleteRecipe({ get,setPreviewModal, setOpenEdit, setOpenDlt }) {
  const {  setData,setForLoad } = useContext(UserContext);

  const [buttonLoading, setButtonLoading] = useState(false);
//   console.log(buttonLoading);

const dRecipe = async () => {
    let getting=get
        try {
            setButtonLoading(true)
            setPreviewModal(false)
          const serve = await dltRecipe(getting._id);
          setForLoad(serve.data.findall.length)
          console.log("dfg")
          setData(serve.data.findall.reverse())
    //       if (serve.data.message === "Recipe deleted Successfull") {
    //         toast.success(serve.data.message, {
    //             position: "bottom-center",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //           });
    //         //   setButtonLoading(false);
    //         //   setTimeout(() =>setData(serve.data.findall.reverse()),7500);
    
    //         //   setTimeout(() =>setPreviewModal(false),5500);
             
    
    // // setOpenEdit(false)
    //       }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <>
      <div className="inputform bpad height">
        {buttonLoading ? (
          <div class="loader">
            <i class="loader-el"></i>
            <i class="loader-el"></i>
          </div>
        ) : (
          <>
            <h3>
              Are you sure want delete <span>{get.title}</span> ?{" "}
            </h3>

            <div className="yesorno">
              {/* <div> */}
              <span
                className="edit"
                onClick={() => {
                  setOpenEdit(false);
                  setOpenDlt(false);
                }}
              >
                No
              </span>
              <span
                className="edit"
                onClick={()=>dRecipe()}
              >
                Yes
              </span>

            </div>
          </>
        )}
      </div>


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

export default DeleteRecipe;
