import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  Typography,
  FormControlLabel,
  MenuItem,
  Modal 
} from "@mui/material";

import CustomForm from "../../../src/components/forms/fb-elements/CustomForm";
import BounceLoader from "react-spinners/BounceLoader";
import Router from "next/router";
import axios from "axios";

const steps = ["Account", "Transaction PIN", "Finish"];

export function getServerSideProps({ query }) {
  // if query object was received, return it as a router prop:
  if (query.Slug) {
    return { props: { router: { query } } };
  }
  // obtain employeeId elsewhere, redirect or fallback to some default value:
  /* ... */
  return { props: { router: { query: { Slug: 8432 } } } };
}

const Purchase = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [amount, setAmount] = React.useState("");
  const [ isloading, setIsloading ] = useState(true);
  const [phone, setPhonenumber] = React.useState("");
  const [type, setType] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [walletOperator, setWalletOperator] = React.useState("");
  const [amountTP, setAmountTP] = React.useState(0);
  const [userData, setUserData] = React.useState("");
  const [skipped, setSkipped] = React.useState(new Set());
  const [paymentDesc, setPaymentDesc] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [subType, setSubType] = React.useState("");
  const [dataServices, setDataServices] = React.useState("");
  

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    //const token = localStorage.getItem("userToken");
    // setAccessToken(token);
    setUserData(currentUser);
    fetchType();
    getAllServices();
  }, []);

  const fetchType = () => {
    console.log("this is the subscription type", Router.query.type);
    setSubType(Router.query.type);
  };

  React.useEffect(() =>{
    setTimeout(() => setIsloading(false), 2000);
  });

  const getAllServices = () => {

    // setIsloading(true);
    const headers = {
      Accept: "application/json",
      // Authorization: accessToken ? accessToken : "No Auth"
    }

    axios({
      method: 'get',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/wallet/getAllProducts',
      headers,
    }).then(function(response){
        // console.log("this is the data serviced data -->", response.data);
        // setIsloading(false);
        if(response.data.statusCode === "000"){
          console.log("this is the data serviced data -->", response.data.data.others);
          let daily = response.data.data.others.daily;
          let weekend = response.data.data.others.weekend;
          let weekly = response.data.data.others.weekly;
          let days = response.data.data.others.days;
          let monthly = response.data.data.others.monthly;
          const respData = daily.concat(weekend, weekly, days, monthly);
          console.log("this is the respData -->", respData);
          setDataServices(respData);
           // setUserResponseData(response.data.payload);
          //setBalanceAmount(response.data.payload.wallet_balance);
          //setPinStatus(response.data.payload.isPin);
          // setDataServices(response.data.data);
        } else {
          console.log("this is the response gotten", response);
        }
    }).catch((error) => {
        //setIsloading(false);
        console.log("this is the error response gotten", error);
        //setErrorResponse("Invalid Login Credentials");
        setTimeout(setEmptyAlert, 5000);
    })
  };

  return (
    <>
      { isloading ? <BounceLoader color="#000" loading={isloading} cssOverride={{ margin: '22em auto', width: '10%', display: 'block' }} size={50} /> : <CustomForm data={userData} acctype={subType} services={dataServices} /> }
    </>
  );
};

export default Purchase;
