import React from "react";
import { useDispatch } from "react-redux";
import { getPaymentDetails } from "../../stores/thunks/paymentThunk";
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

export default function ProjectDetailsCard() {
  const dispatch = useDispatch();
  const emilAddr = JSON.parse(sessionStorage.getItem("info") || "null")?.emilAddr;
  const startDate = useRef("");
  const companyName = useRef("");
  const projectTitle = useRef("");
  const paymentType = useRef();

  const depositOnClickHandler = useEffect(() => {
    dispatch(
      getPaymentDetails({
        emilAddr: "",
        startDate: "",
        companyName: "",
        projectTitle: "",
        paymentType: "",
      })
    );
  }, [emilAddr, startDate, companyName, projectTitle, paymentType, dispatch]);
  const downPaymentOnClickHandler = useEffect(() => {
    dispatch(
      getPaymentDetails({
        emilAddr: "",
        startDate: "",
        companyName: "",
        projectTitle: "",
        paymentType: "",
      })
    );
  }, [emilAddr, startDate, companyName, projectTitle, paymentType, dispatch]);
  return (
    <>
      <h2
        onClick={depositOnClickHandler}
        style={{ display: "inline-block", padding: "1rem" }}
        ref={paymentType}
      >
        <NavLink to={"/payment/deposit"}>보증금</NavLink>
      </h2>

      <h2 style={{ display: "inline-block" }}>/</h2>

      <h2
        onClick={downPaymentOnClickHandler}
        style={{ display: "inline-block", padding: "1rem" }}
      >
        <NavLink to={"/payment/downpayment"}>계약금</NavLink>
      </h2>
    </>
  );
}
