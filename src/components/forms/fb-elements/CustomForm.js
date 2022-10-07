import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    FormControlLabel,
    Button,
    Grid,
    MenuItem,
    FormControl,
    TextField,
    Modal
} from '@mui/material';

import CustomSelect from "../custom-elements/CustomSelect";
import CustomFormLabel from "../custom-elements/CustomFormLabel";
import CustomTextField from "../custom-elements/CustomTextField";
import styles from "../../../../styles/Component.module.css";
import axios from "axios";
import NextLink from "next/link";
import ErrorToaster from "../../dashboard/dashboard1/ErrorToaster"
import SuccessToaster from "../../dashboard/dashboard1/SuccessToaster";
import { useRouter } from "next/router";

const initalValues = {
  phone_number: "",
  pin: "",
};

const CustomForm = ({ data, acctype, services }) => {

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = React.useState("");
  const [phone, setPhonenumber] = React.useState("");
  const [type, setType] = React.useState("");
  const [dataType, setDataType] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [walletOperator, setWalletOperator] = React.useState("");
  const [amountTP, setAmountTP] = React.useState(0);
  const [balanceAmount, setBalanceAmount] = React.useState(0);
  const [userData, setUserData] = React.useState("");
  const [skipped, setSkipped] = React.useState(new Set());
  const [ response, setResponse ] = useState('');
  const [ errorResponse, setErrorResponse ] = useState('');
  const [paymentDesc, setPaymentDesc] = React.useState("");
  const [pin, setPin] = React.useState(""); 
  // const [ isloading, setIsloading ] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    retrieveUserDetails();
    // getAllServices();
  }, []);

  const headers = {
    Accept: "application/json",
    // Authorization: accessToken ? accessToken : "No Auth"
  }

  const retrieveUserDetails = () => {

    // setIsloading(true);
    const headers = {
      Accept: "application/json",
      // Authorization: accessToken ? accessToken : "No Auth"
    }

    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/get_UserDetails',
      headers,
      data:{
        phone_number: data.phone_number,
        user_id: data._id
      }
    }).then(function(response){
        console.log("this is the response data -->", response.data);
        // setIsloading(false);
        if(response.data.statusCode === "000"){
          // setUserResponseData(response.data.payload);
          setBalanceAmount(response.data.payload.wallet_balance);
          //setPinStatus(response.data.payload.isPin);
          //console.log("this is the balance --->", response.data.payload.wallet_balance);
        } else {
          console.log("this is the response gotten", response);
        }
    }).catch((error) => {
        // setIsloading(false);
        console.log("this is the error response gotten", error);
        //setErrorResponse("Invalid Login Credentials");
        setTimeout(setEmptyAlert, 5000);
    })
  };

  

  const handleTransaction = (payload) => {
    setPin(payload.pin);
    const number = "0" + payload.phone_number
    setPhonenumber(number);
    validatePIN(payload.pin);
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
    console.log("this is the amount to pay -->", amounttpValue);
    setAmount(e);
    data.acctype === "Merchant" ? setAmountTP(amounttpValue)  : setAmountTP(e);
    // console.log("this is the amount to pay stored -->", amountTP);
    setPaymentDesc("You are purchasing an airtime of " + e + " for this phone number " + phone_number);
  } 

  const setDataAmount = (e) => {
    console.log("this is the transaction amount", e);
    const amounttp = e * 0.03;
    const amounttpValue = (e - amounttp);
    let phone_number = phone ? phone : "";
    console.log("this is the type value -->", type);
    console.log("this is the payment type -->", paymentType);
    console.log("this is the walletOperator -->", walletOperator);
    console.log("this is the amount -->", e);
    console.log("this is the amount to pay -->", amounttpValue);
    setAmount(e);
    // setDataType(e)
    data.acctype === "Merchant" ? setAmountTP(amounttpValue)  : setAmountTP(e);
    // console.log("this is the amount to pay stored -->", amountTP);
    setPaymentDesc("You are purchasing an airtime of " + e + " for this phone number " + phone_number);
  }

  const completeAirtime = () => {

    axios({
        method: 'post',
        url: 'https://mtn-backend-api-service.herokuapp.com/v1/wallet/buyAirtime',
        headers,
        data: {
          transactionId: Math.floor(Math.random() * 2356472122),
          user_id: data._id,
          phone_number: data.phone_number,
          msisdn: phone,
          amount: parseInt(amount),
          amount_charged: amountTP,
          pin: pin
          // previous_balance: data && data.wallet_balance ? data.wallet_balance : " ",
          // description: "Wallet Top up with amount " + amount + " was successful"
        }
      }).then(function(response){
          console.log("this is the response data -->", response.data);
          // setIsloading(false);
          if(response.data.statusCode === "0000"){
            setResponse(response.data.statusMessage);
            setTimeout(() => {
              Router.replace("/dashboards/dashboard1");
            }, 2000)
          } else {
            console.log("this is the response gotten", response);
            setErrorResponse("Unable to create PIN");
          }
      }).catch((error) => {
            // setIsloading(false);
            console.log("this is the error response gotten", error);
            setTimeout(() => {
                Router.replace("/dashboards/dashboard1");
            }, 3000);
          setErrorResponse("Topup or bundle activation failed");
          setTimeout(setEmptyAlert, 5000);
      })
  }

  const validatePIN = (transPin) => {

    axios({
        method: 'post',
        url: 'https://mtn-backend-api-service.herokuapp.com/v1/wallet/pinValidation',
        headers,
        data: {
          user_id: data._id,
          phone_number: data.phone_number,
          pin: transPin
        }
      }).then(function(response){
          console.log("this is the response data -->", response.data);
          // setIsloading(false);
          if(response.data.statusCode === "000"){
            // setResponse(response.data.statusMessage);
            // return response.data.statusCode;
            if(balanceAmount >= amount){
              setOpen(true);
            } else {
              setErrorResponse("Insufficient Balance, Kindly TopUp Wallet");
            }
          } else {
            console.log("this is the response gotten", response);
            setErrorResponse("PIN Validation failed");
            return response.data.statusCode;
          }
      }).catch((error) => {
            // setIsloading(false);
          console.log("this is the error response gotten", error);
          setErrorResponse("Wrong PIN entered, Enter a correct PIN");
          setTimeout(setEmptyAlert, 5000);
          return error;
      })
  }

  const completeData = () => {

    axios({
        method: 'post',
        url: 'https://mtn-backend-api-service.herokuapp.com/v1/wallet/buyData',
        headers,
        data: {
          transactionId: Math.floor(Math.random() * 98881228958813),
          user_id: data._id,
          phone_number: data.phone_number,
          msisdn: phone,
          amount: parseInt(amount),
          amount_charged: amountTP,
          pin: pin
          // previous_balance: data && data.wallet_balance ? data.wallet_balance : " ",
          // description: "Wallet Top up with amount " + amount + " was successful"
        }
      }).then(function(response){
          console.log("this is the response data -->", response.data);
          // setIsloading(false);
          if(response.data.statusCode === "0000"){
            setResponse(response.data.statusMessage);
            setTimeout(() => {
              Router.replace("/dashboards/dashboard1");
            }, 2000)
          } else {
            console.log("this is the response gotten", response);
            setErrorResponse("Data Top Up Failed");
          }
      }).catch((error) => {
            // setIsloading(false);
            console.log("this is the error response gotten", error);
            setTimeout(() => {
                Router.replace("/dashboards/dashboard1");
            }, 3000);
          setErrorResponse("Data Top Up Failed");
          setTimeout(setEmptyAlert, 5000);
      })
  }  

  const handleClose = () => {
    setOpen(false);
  };

  const setEmptyAlert = () => {
    setResponse("");
    setErrorResponse("");
  }


  return (
      <>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modal___window__3}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h2>Transaction Details</h2>
                <p><b>Amount: </b>{amount}</p>
                <p><b>Amount To Pay: </b>{amountTP}</p>
                <p><b>Payment Description: </b>{paymentDesc}</p>
              </Typography>
              {acctype && acctype=="airtime" ? <Button onClick={completeAirtime} sx={{ mt: 2 }} variant="contained" color="success">
                  Buy Airtime
              </Button> : <Button onClick={completeData} sx={{ mt: 2 }} variant="contained" color="success">
                  Buy Data
              </Button> }
            </Box>
          </Modal>
        </div>
      <Card
        sx={{
          p: 0,
        }}
      >
          <Box
            sx={{
              padding: '15px 30px',
            }}
            display="flex"
            alignItems="center"
          >
            <Box flexGrow={1}>
              <Typography variant="h3">
                Hi {data.firstname}, Buy Your <b>{acctype ? acctype : "" }</b>
              </Typography>
            </Box>
          </Box>
          <Divider />
        <CardContent>
        <Formik
            initialValues={initalValues}
            validationSchema={object({
            phone_number: string().required("Please enter phone number").min(10, "Not a valid number").max(10, "Not a valid number"),
            pin: string().required("Please enter pin").min(4, "Name too short").max(4, "Not more than 4 digit"),
            })}
            onSubmit={(values, formikHelpers) => {
              handleTransaction(values);
              // console.log(values);
              formikHelpers.resetForm();
            }}
        >
        {({ errors, isValid, touched, dirty }) => (
            <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="Payment">Select Type</CustomFormLabel>
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
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="Payment">Select Payment Method</CustomFormLabel>
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
              </Grid>
              <Grid item xs={12} lg={6}>
                  <CustomFormLabel htmlFor="Email">Select Network Provider</CustomFormLabel>
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
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="Email">Enter Phone number</CustomFormLabel>
                <Field
                  name="phone_number"
                  type="number"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Phone number"
                  fullWidth
                  //onChange={e => setPhonenumber(e.target.value)} 
                  error={Boolean(errors.phone_number) && Boolean(touched.phone_number)}
                  helperText={Boolean(touched.phone_number) && errors.phone_number}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                { acctype == "airtime" ?
                <div>
                  <CustomFormLabel htmlFor="Email">Enter Amount</CustomFormLabel>
                  <Field
                      name="amount"
                      type="number"
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Amount"
                      fullWidth
                      onChange={e => setTransactionAmount(e.target.value)} 
                      required
                    />
                </div>
                : 
                <>
                  <CustomFormLabel htmlFor="Email">Select Data Offer</CustomFormLabel>
                  
                  <CustomSelect
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      // value={acctype}
                      // onChange={handleChange}
                      fullWidth
                      size="small"
                      onChange={e => setDataAmount(e.target.value)}
                      >
                      {services && services.length > 0 && services.map((service) => (
                        <MenuItem key={service.id} value={service.amount}>{service.name}</MenuItem>
                      ))}
                      <MenuItem value="EPIN">EPIN</MenuItem>
                  </CustomSelect>
                </>
                }
              </Grid>
              {/* <Box height={14} /> */}
              <Grid item xs={12} lg={6}>
              <>
              { data.isPin == true ? <div><CustomFormLabel htmlFor="Email">Enter Transaction PIN</CustomFormLabel>
                {/* <Box height={14} /> */}
                <Field
                  name="pin"
                  type="password"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="pin"
                  fullWidth
                  error={Boolean(errors.pin) && Boolean(touched.pin)}
                  helperText={Boolean(touched.pin) && errors.pin}
                /></div> : <Box sx={{ mt: 6}}> Kindly Create Your Transaction PIN to complete this transaction by <NextLink href="/dashboards/set-pin">Clicking Me</NextLink>  </Box> }
              </>                
              </Grid>
              {/* <Box height={14} /> */}
              <Grid item xs={12} lg={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!isValid || !dirty}
                >
                  Purchase
                </Button>
              </Grid>
              </Grid>
            </Form>
        )}
      </Formik>
    </CardContent>
      </Card>
      { errorResponse && <ErrorToaster title={ errorResponse } /> }
      { response && <SuccessToaster title={ response } /> }    
      </>

    
  );
};

export default CustomForm;