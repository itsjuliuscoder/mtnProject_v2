import React, { useEffect } from "react";
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
import { Router } from "@mui/icons-material";

const steps = ["Account", "Transaction PIN", "Finish"];

const Purchase = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [amount, setAmount] = React.useState("");
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
  

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    //const token = localStorage.getItem("userToken");
    // setAccessToken(token);
    setUserData(currentUser);
    fetchType()
  }, []);

  const fetchType = () => {
    // console.log("this is the subscription type", Router.query.type);
    // setSubType(Router.query.type);
    console.log("this is the subscription type state data", subType);
  };

  return (
    <>
      <CustomForm data={userData} />
    </>
  );
};

export default Purchase;
