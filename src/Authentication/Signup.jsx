import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { registerUser } from "../ApiRequest/ApiRequest";

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userEmail:"",
      userName: "",
      password: "",
      confirmpassword: "",
      profileImage: "",
      coverImage: "",
      profileImage_publicId: "",
      coverImage_publicId: "",
    },
    validate: (values) => {
      let error = {};

      if (values.userName === "") {
        error.userName = "please enter First name";
      }
      if (
        values.userName &&
        (values.userName.length <= 2 || values.userName.length > 15)
      ) {
        error.userName = "Name must be between 3 to 15 characters";
      }
      if (values.userEmail === "") {
        error.userEmail = "please enter Email";
      }
      if (
        values.userEmail &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-z]{2,4}$/i.test(values.userEmail)
      ) {
        error.userEmail = " please enter a valid Email";
      }

      if (values.password === "") {
        error.password = "please enter Password";
      }
      if (
        values.password &&
        (values.password.length <= 7 || values.password.length > 12)
      ) {
        error.password = "Password must be between 8 to 12 characters";
      }
      if (values.confirmpassword === "") {
        error.confirmpassword = "please enter Password again";
      }
      if (
        values.confirmpassword &&
        (values.confirmpassword.length <= 7 ||
          values.confirmpassword.length > 12)
      ) {
        error.confirmpassword = "Password must be between 8 to 12 characters";
      }

      if (
        values.password.length > 7 &&
        values.confirmpassword.length > 7 &&
        values.password.length < 13 &&
        values.confirmpassword.length < 13 &&
        values.password !== values.confirmpassword
      ) {
        error.confirmpassword = "Password not matching";

        error.password = "Password not matching";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        setButtonLoading(true);
        const createAcc = await registerUser(values);

        if (createAcc.data.message === "Registered Successfully") {
          toast.success(createAcc.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => formik.resetForm(), 3000);
          setButtonLoading(false);

          setTimeout(() => navigate("/"), 5500);
        } else if (
          createAcc.data.message === "Email-id or userName already in use" ||
          "Email-id already in use" ||
          "userName already in use"
        ) {
          toast.error(createAcc.data.message, {
            position: "top-right",
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
  const [passwordDispaly, setPasswordDisplay] = useState("Show");

  const [passwordType, setPasswordType] = useState("password");
  const changeType = () => {
    if (passwordType === "password") {
      setPasswordDisplay("Hide");
      setPasswordType("text");
    } else {
      setPasswordType("password");
      setPasswordDisplay("Show");
    }
  };

  const [passwordDispalyTwo, setPasswordDisplayTwo] = useState("Show");

  const [passwordTypeTwo, setPasswordTypeTwo] = useState("password");
  const changeTypeTwo = () => {
    if (passwordTypeTwo === "password") {
      setPasswordDisplayTwo("Hide");
      setPasswordTypeTwo("text");
    } else {
      setPasswordTypeTwo("password");
      setPasswordDisplayTwo("Show");
    }
  };
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <>
      <div className="inputbg">
        <form className="inputform">
          <h3>Sign Up</h3>
          <div className="Inputpair">
            <input
              className="Input"
              type="text"
              placeholder="Name"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={`
                  ${
                    formik.touched.userName && formik.errors.userName
                      ? "error-box"
                      : ""
                  }
                  ${
                    formik.touched.userName && !formik.errors.userName
                      ? "success-box"
                      : ""
                  }

                  `}
            />
            {formik.touched.userName && formik.errors.userName ? (
              <span className="err">{formik.errors.userName} </span>
            ) : null}
          </div>

          <div className="Inputpair">
            <input
              className="InputBig"
              type="userEmail"
              placeholder="Email"
              name="userEmail"
              value={formik.values.userEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id={`
							${formik.touched.userEmail && formik.errors.userEmail ? "error-box" : ""}
							${formik.touched.userEmail && !formik.errors.userEmail ? "success-box" : ""}

							`}
            />
            {formik.touched.userEmail && formik.errors.userEmail ? (
              <span className="err">{formik.errors.userEmail} </span>
            ) : null}
          </div>

          <div className="Inputpair">
            <div
              className="Input"
              id={`
							${formik.touched.password && formik.errors.password ? "error-box" : ""}
							${formik.touched.password && !formik.errors.password ? "success-box" : ""}

							`}
            >
              <input
                className="InputPassword"
                type={passwordType}
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span onClick={changeType} className="InputPasswordSpan">
                {passwordDispaly}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <span className="err">{formik.errors.password} </span>
            ) : null}
          </div>
          <div className="Inputpair">
            <div
              className="Input"
              id={`
							${
                formik.touched.confirmpassword && formik.errors.confirmpassword
                  ? "error-box"
                  : ""
              }
							${
                formik.touched.confirmpassword && !formik.errors.confirmpassword
                  ? "success-box"
                  : ""
              }

							`}
            >
              <input
                className="InputPassword"
                type={passwordTypeTwo}
                placeholder="Confirm Password"
                name="confirmpassword"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span onClick={changeTypeTwo} className="InputPasswordSpan">
                {passwordDispalyTwo}
              </span>
            </div>
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <span className="err">{formik.errors.confirmpassword} </span>
            ) : null}
          </div>

          <Link className="forlinks InputLink" to="/">
            Already have an account. Login!
          </Link>
          <button
            onClick={formik.handleSubmit}
            type="submit"
            className="button InputButton"
          >
            {buttonLoading ? "Create" : "Create"}
          </button>
        </form>
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
  );
}

export default Signup;
