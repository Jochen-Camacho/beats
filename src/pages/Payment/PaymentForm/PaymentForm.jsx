import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";

export const PaymentForm = () => {
  const { clear } = useCart();
  const navigvate = useNavigate();
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiry: "",
      cnc: "",
      firstName: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(12, "Must be 12 digits")
        .max(12, "Must be exactly 12 digits"),
      expiry: Yup.string()
        .required("Required")
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date"),
      cnc: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(3, "Must be exactly 3 digits")
        .max(3, "Must be exactly 3 digits"),
      firstName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      clear();
      navigvate("/payment/success");
    },
  });
  return (
    <form className="cardInfoCont" onSubmit={formik.handleSubmit}>
      <input
        type="text"
        name="cardNumber"
        onChange={formik.handleChange}
        value={formik.values.cardNumber}
        className="formEntry formPayEntry"
        placeholder="Card Number"
      ></input>
      {formik.touched.cardNumber && formik.errors.cardNumber ? (
        <div>{formik.errors.cardNumber}</div>
      ) : null}

      <div className="dualEntry">
        <input
          type="text"
          name="expiry"
          onChange={formik.handleChange}
          value={formik.values.expiry}
          placeholder="MM/YY"
          className="formEntry formPayEntry"
        />
        {formik.touched.expiry && formik.errors.expiry ? (
          <div>{formik.errors.expiry}</div>
        ) : null}
        <input
          type="text"
          name="cnc"
          onChange={formik.handleChange}
          value={formik.values.cnc}
          className="formEntry formPayEntry"
          placeholder="CNC"
        ></input>
        {formik.touched.cnc && formik.errors.cnc ? (
          <div>{formik.errors.cnc}</div>
        ) : null}
      </div>
      <input
        type="text"
        name="firstName"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        className="formEntry formPayEntry"
        placeholder="First Name"
      ></input>
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}
      <button type="submit" className="btnPrimary">
        Purchase
      </button>
    </form>
  );
};
