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
  MenuItem
} from "@mui/material";

import CustomTextField from "../../../src/components/forms/custom-elements/CustomTextField";
import CustomCheckbox from "../../../src/components/forms/custom-elements/CustomCheckbox";
import CustomFormLabel from "../../../src/components/forms/custom-elements/CustomFormLabel";
import CustomSelect from "../../../src/components/forms/custom-elements/CustomSelect";
import styles from "../../../styles/Component.module.css";
import Router from "next/router";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import ErrorToaster from "../../../src/components/dashboard/dashboard1/ErrorToaster";
import SuccessToaster from "../../../src/components/dashboard/dashboard1/SuccessToaster";

const steps = ["Account", "Transaction PIN", "Finish"];

const FormWizard = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const [phone, setPhonenumber] = React.useState("");
  const [type, setType] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [walletOperator, setWalletOperator] = React.useState("");
  const [amountTP, setAmountTP] = React.useState(0);
  const [userData, setUserData] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");
  const [skipped, setSkipped] = React.useState(new Set());
  const [paymentDesc, setPaymentDesc] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [subType, setSubType] = React.useState("");
  const [ isloading, setIsloading ] = React.useState(true);
  const [ response, setResponse ] = React.useState('');
  const [ errorResponse, setErrorResponse ] = React.useState('');
  


  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    setAccessToken(token);
    fetchType();
    setUserData(currentUser);
    retrieveUserDetails();
  }, []);

  const retrieveUserDetails = () => {

    setIsloading(true);
    const headers = {
      Accept: "application/json",
      // Authorization: accessToken ? accessToken : "No Auth"
    }

    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/get_UserDetails',
      headers,
      data:{
        phone_number: userData.phone_number,
        user_id: userData._id
      }
    }).then(function(response){
        console.log("this is the response data -->", response.data);
        setIsloading(false);
        if(response.data.statusCode === "000"){
          // setUserResponseData(response.data.payload);
          setBalanceAmount(response.data.payload.wallet_balance);
          setPinStatus(response.data.payload.isPin);
        } else {
          console.log("this is the response gotten", response);
        }
    }).catch((error) => {
        setIsloading(false);
        console.log("this is the error response gotten", error);
        //setErrorResponse("Invalid Login Credentials");
        setTimeout(setEmptyAlert, 5000);
    })
  };

  const fetchType = () => {
    //console.log("this is the subscription type", Router.query.type);
    setSubType(Router.query.type);
    //console.log("this is the subscription type state data", subType);
  };

  const setEmptyAlert = () => {
    setResponse("");
    setErrorResponse("");
  }

  const headers = {
    Accept: "application/json",
    Authorization: accessToken ? accessToken : "No Auth"
  }

  const completeTransaction = () => {
      return (subType == "airtime") ? submitAirtime : submitData;
  }

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const setTransactionAmount = (e) => {
    // console.log("this is the transaction amount", e);
    const amounttp = e * 0.03;
    const amounttpValue = (e - amounttp);
    let phone_number = phone ? phone : "";
    console.log("this is the type value -->", type);
    console.log("this is the payment type -->", paymentType);
    console.log("this is the walletOperator -->", walletOperator);
    console.log("this is the amount -->", e);
    setAmount(e);
    userData.acctype === "Merchant" ? setAmountTP(amounttpValue)  : setAmountTP(e);
    setPaymentDesc("You are purchasing an airtime of " + e + " for this phone number " + phone);
  }

  const completeAirtime = () => {
    axios({
        method: 'post',
        url: 'https://mtn-backend-api-service.herokuapp.com/v1/wallet/buyAirtime',
        headers,
        data: {
          transactionId: Math.floor(Math.random() * 2356472122),
          user_id: userData._id,
          phone_number: userData.phone_number,
          msisdn: phone,
          amount: parseInt(amount),
          amount_charged: amountTP,
          pin: pin
          // previous_balance: data && data.wallet_balance ? data.wallet_balance : " ",
          // description: "Wallet Top up with amount " + amount + " was successful"
        }
      }).then(function(response){
          console.log("this is the response data -->", response.data);
          setIsloading(false);
          if(response.data.statusCode === "000"){
            setResponse(response.data.statusMessage);
            setTimeout(() => {
              Router.replace("/dashboards/dashboard1");
            }, 3000)
          } else {
            console.log("this is the response gotten", response);
            setErrorResponse("Unable to create PIN");
          }
      }).catch((error) => {
            setIsloading(false);
            console.log("this is the error response gotten", error);
            setTimeout(() => {
                Router.replace("/dashboards/dashboard1");
            }, 3000);
          setErrorResponse("Topup or bundle activation failed");
          setTimeout(setEmptyAlert, 5000);
      })
  }

  const completeData = () => {

    axios({
        method: 'post',
        url: 'https://mtn-backend-api-service.herokuapp.com/v1/wallet/buyData',
        headers,
        data: {
          transactionId: Math.floor(Math.random() * 2356472122),
          user_id: userData._id,
          phone_number: userData.phone_number,
          msisdn: phone,
          amount: parseInt(amount),
          amount_charged: amountTP,
          pin: pin
          // previous_balance: data && data.wallet_balance ? data.wallet_balance : " ",
          // description: "Wallet Top up with amount " + amount + " was successful"
        }
      }).then(function(response){
          console.log("this is the response data -->", response.data);
          setIsloading(false);
          if(response.data.statusCode === "000"){
            setResponse(response.data.statusMessage);
            setTimeout(() => {
              Router.replace("/dashboards/dashboard1");
            }, 3000)
          } else {
            console.log("this is the response gotten", error);
            setTimeout(() => {
                Router.replace("/dashboards/dashboard1");
            }, 3000);
            setErrorResponse("Unable to topup airtime");
          }
      }).catch((error) => {
          setIsloading(false);
          console.log("this is the error response gotten", error);
          setErrorResponse("Topup or bundle activation failed");
          setTimeout(setEmptyAlert, 5000);
      })
  }

  // eslint-disable-next-line consistent-return
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <CustomFormLabel htmlFor="Name">Select Type</CustomFormLabel>
            <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={acctype}
                // onChange={handleChange}
                fullWidth
                size="small"
                onChange={e => setType(e.target.value)}
                >
                <MenuItem value="VTU">VTU(Airtime & Data)</MenuItem>
                <MenuItem value="EPIN">EPIN</MenuItem>
            </CustomSelect>
            { subType == "data" ? 
            <>
            <CustomFormLabel htmlFor="Name">Select Data Subscription</CustomFormLabel>
                <CustomSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={acctype}
                    // onChange={handleChange}
                    fullWidth
                    size="small"
                    onChange={e => setType(e.target.value)}
                    >
                    <MenuItem value="VTU">VTU(Airtime & Data)</MenuItem>
                    <MenuItem value="EPIN">EPIN</MenuItem>
            </CustomSelect>
            </>
           : ""

            }
            
            <CustomFormLabel htmlFor="Email">Select Payment Method</CustomFormLabel>
            <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={acctype}
                // onChange={handleChange}
                fullWidth
                size="small"
                onChange={e => setPaymentType(e.target.value)}
                >
                <MenuItem value="Wallet">Wallet</MenuItem>
                <MenuItem value="Bonus">Bonus</MenuItem>
                <MenuItem value="Card">Card</MenuItem>
            </CustomSelect>
            <CustomFormLabel htmlFor="Password">Network</CustomFormLabel>
            {/* <CustomTextField 
                type="number"
                placeholder="MTN"
                name="phone_number" 
                id="phone_number" 
                variant="outlined" 
                size="small"
                fullWidth 
                value="MTN"
                required
                disabled
                //value={phone_number}
                //onChange={e => setPhonenumber(e.target.value)} 
            /> */}
            <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // onChange={handleChange}
                fullWidth
                size="small"
                onChange={e => setWalletOperator(e.target.value)}
                >
                <MenuItem value="MTN">MTN</MenuItem>
                <MenuItem value="AIRTEL">AIRTEL</MenuItem>
                <MenuItem value="9MOBILE">9MOBILE</MenuItem>
                <MenuItem value="GLO">GLO</MenuItem>
            </CustomSelect>
            <CustomFormLabel htmlFor="Password">Recipient Mobile Number</CustomFormLabel>
            <input
              maxLength={11}
              type="text"
              id="phone_number"
              name="phone_number"
              className={styles.input__field}
              required
              value={phone ? phone : ""}
              onChange={e => setPhonenumber(e.target.value)} 
            />
            {/* <CustomTextField
              maxLength="11"
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
            /> */}
            <CustomFormLabel htmlFor="Amount">Amount</CustomFormLabel>
            <CustomTextField
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
              onChange={e => setTransactionAmount(e.target.value)} 
              required
            />
            <CustomFormLabel htmlFor="Amount">Amount To Pay</CustomFormLabel>
            <CustomTextField
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              name="amount_tp"
              disabled
              value={amountTP ? amountTP : '0'}
              placeholder="599"
              sx={{ mb: 3 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <CustomFormLabel htmlFor="Address">Payment Description</CustomFormLabel>
            <CustomTextField
              id="Address"
              value={paymentDesc ? paymentDesc : "Your Payment Description" }
              name="paymentDesc"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              disabled
              sx={{ mt: 1, mb: 3 }}
            />
            {/* <CustomTextField
              id="pin"
              size="small"
              variant="outlined"
              maxLength="4"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
            /> */}
            <CustomFormLabel htmlFor="Fname">Enter Transaction PIN</CustomFormLabel>
            <input
              maxLength={4}
              type="text"
              id="pin"
              name="pin"
              className={styles.input__field}
              required
              value={pin ? pin : ""}
              onChange={e => setPin(e.target.value)}
              //value={firstName}
              //onChange={handleNameChange}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h2">Payment Details</Typography>
            <Typography variant="h4">Amount: {amount}</Typography>
            <Typography variant="h4">Amount To Pay: {amountTP}</Typography>
            <Typography variant="h4">Payment Description: {paymentDesc}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Thank you for using rightNet.
            </Typography>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Agree with terms?"
            />
          </Box>
        );
      default:
        break;
    }
  };

  React.useEffect(() =>{
    setTimeout(() => setIsloading(false), 3000);
  });

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <>
        { isloading ? <BeatLoader color="#000" loading={isloading} cssOverride={{ margin: '22em auto', width: '10%', display: 'block' }} size={30} /> :
            <Card>
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                    labelProps.optional = (
                        <Typography variant="caption">Important</Typography>
                    );
                    }
                    if (isStepSkipped(index)) {
                    stepProps.completed = false;
                    }
                    return (
                    <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                    );
                })}
                </Stepper>
                {activeStep === steps.length ? (
                <>
                    <Box
                    sx={{
                        m: 3,
                        p: 2,
                        // backgroundColor: "primary.light",
                        borderRadius: 1,
                    }}
                    >
                        <Typography>
                            Thank You for using RightNet
                        </Typography>
                    {  subType == "data" ? 
                    
                        <Button  onClick={completeData} sx={{ mt: 2 }} variant="contained" color="success">
                            Complete Transaction
                        </Button> : 
                        <Button  onClick={completeAirtime} sx={{ mt: 2 }} variant="contained" color="success">
                            Complete Transaction
                        </Button>
                    }
                    </Box>

                    <Box display="flex" sx={{ flexDirection: "row", p: 3 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset} variant="contained" color="error">
                        Reset
                    </Button>
                    </Box>
                </>
                ) : (
                <>
                    <Box>{handleSteps(activeStep)}</Box>

                    <Box display="flex" sx={{ flexDirection: "row", p: 3 }}>
                    <Button
                        color="inherit"
                        variant="contained"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {/* {isStepOptional(activeStep) && (
                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                        </Button>
                    )} */}
                    { phone && amount != " " ? <Button
                        onClick={handleNext}
                        variant="contained"
                        // disabled={(steps === "One Time PIN") && (pin === "")}
                        color={
                        activeStep === steps.length - 1 ? "success" : "secondary"
                        }
                    >
                        {((activeStep === steps.length - 1) && (pin != "")) ? "Finish" : "Next"}
                    </Button>  : ""}
                
                    </Box>
                </>
                )}
            </Box>
            </Card>
            }

            { errorResponse && <ErrorToaster title={ errorResponse } /> }
            { response && <SuccessToaster title={ response } /> }
    </>
  );
};

export default FormWizard;
