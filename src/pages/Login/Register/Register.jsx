import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../hooks/useAuth";

export const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordComf: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().required("Required").email(),
      password: Yup.string().required("Required").min(8, "Too Short (8 min)"),
      passwordComf: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords Don't Match"),
    }),
    onSubmit: (values) => {
      auth.register(values.username, values.password);
      navigate("/");
    },
  });

  return (
    <div className="pageCont">
      <div className="innerFormPageCont">
        <div className="formPageCont">
          <div className="formPageTitle navLogo">BEATS</div>
          <form className="formPageContent" onSubmit={formik.handleSubmit}>
            <label className="formEntryCont errorCont">
              Username:{" "}
              {formik.touched.username && formik.errors.username ? (
                <div className="formError">{formik.errors.username}</div>
              ) : null}
              <input
                name="username"
                type="text"
                className="formEntry"
                value={formik.values.username}
                onChange={formik.handleChange}
              ></input>
            </label>
            <label className="formEntryCont  errorCont">
              Email:{" "}
              {formik.touched.email && formik.errors.email ? (
                <div className="formError">{formik.errors.email}</div>
              ) : null}
              <input
                name="email"
                type="email"
                className="formEntry"
                value={formik.values.email}
                onChange={formik.handleChange}
              ></input>
            </label>

            <label className="formEntryCont  errorCont">
              Password:
              {formik.touched.password && formik.errors.password ? (
                <div className="formError">{formik.errors.password}</div>
              ) : null}
              <input
                name="password"
                type="password"
                className="formEntry"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></input>
            </label>
            <label className="formEntryCont  errorCont">
              Confirm Password:
              {formik.touched.passwordComf && formik.errors.passwordComf ? (
                <div className="formError">{formik.errors.passwordComf}</div>
              ) : null}
              <input
                name="passwordComf"
                type="password"
                className="formEntry"
                value={formik.values.passwordComf}
                onChange={formik.handleChange}
              ></input>
            </label>

            <button className="formSubmitBtn btnGreen">REGISTER</button>
            {/* <button className="loginSubmitBtn btnGreen">REGISTER</button>*/}
            <small className="formMsg">
              By creating an account and/or logging in, you agree to Beats{" "}
              <span className="link">
                <Link to="/register">Terms and Conditions.</Link>
              </span>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
};
