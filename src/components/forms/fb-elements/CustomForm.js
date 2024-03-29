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
    Dialog,
    DialogTitle,
    Slide,
    DialogContent,
    DialogActions,
    DialogContentText,
    Modal
} from '@mui/material';

import CustomSelect from "../custom-elements/CustomSelect";
import CustomFormLabel from "../custom-elements/CustomFormLabel";
import CustomTextField from "../custom-elements/CustomTextField";
import styles from "../../../../styles/Component.module.css";
import axios from "axios";
import NextLink from "next/link";
import ErrorToaster from "../../dashboard/home/ErrorToaster"
import SuccessToaster from "../../dashboard/home/SuccessToaster";
import { useRouter } from "next/router";
import { PaystackButton } from 'react-paystack';

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
  const [bonusAmount, setBonusAmount] = React.useState(0);
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
    console.log("this is what I got", acctype);
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
          setBonusAmount(response.data.payload.bonus_amount);
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

  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const handlePaystackSuccessAction = (reference) => {  
    // Implementation for whatever you want to do with reference and after success call.

    // const headers = {
    //   Accept: "application/json",
    //   Authorization: accessToken ? accessToken : "No Auth"
    // }


    setResponse("TopUp Successful");
    setTimeout(() => {
      Router.replace("/dashboards/home");
    }, 3000);

    
    /*axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/wallet/purchase',
      headers,
      data: {
        reference_id: reference.trxref,
        user_id: data._id,
        fullname: data.firstname + " " + data.lastname,
        phone_number: data.phone_number,
        amount: amount,

        // previous_balance: data && data.wallet_balance ? data.wallet_balance : " ",
        description: " Purchase" + amount + " was successful"
      }
    }).then(function(response){
        console.log("this is the response data -->", response.data);
        setIsloading(false);
        if(response.data.statusCode === "000"){
          setResponse(response.data.statusMessage);
          setTimeout(() => {
            Router.replace("/dashboards/home");
          }, 3000)
        } else {
          console.log("this is the response gotten", response);
          setErrorResponse("Unable to create PIN");
        }
    }).catch((error) => {
        setIsloading(false);
        console.log("this is the error response gotten");
        setErrorResponse("Wallet Top Up failed");
        setTimeout(setEmptyAlert, 5000);
    })*/

    console.log(reference);
  };

  const componentProps = {
    amount: amount ? (amount * 100) : "100", 
    reference: (new Date()).getTime().toString(),
    email: data && data.email ? data.email : "techcapacitybuilder@gmail.com",
    publicKey: 'pk_test_cdbf19c426a4d163dd3e939e53edde7f831fd6b6',
    text: 'Purchase ' + acctype + ' with Card',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
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
    const amounttp = e * 0.05;
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
          paymentType: paymentType,
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
              Router.replace("/dashboards/home");
            }, 2000)
          } else {
            console.log("this is the response gotten", response);
            setErrorResponse("Unable to create PIN");
          }
      }).catch((error) => {
            // setIsloading(false);
            console.log("this is the error response gotten", error);
            setTimeout(() => {
                Router.replace("/dashboards/home");
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
            if(paymentType == "Wallet"){
              if(balanceAmount >= amount){
                setOpen(true);
              } else {
                setErrorResponse("Insufficient Balance, Kindly TopUp Wallet");
              }
            } else {
              if((bonusAmount >= "1000") && (bonusAmount >= amount)){
                setOpen(true);
              } else {
                setErrorResponse("Insufficient Bonus Balance");
              }
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
          paymentType: paymentType,
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
              Router.replace("/dashboards/home");
            }, 2000)
          } else {
            console.log("this is the response gotten", response);
            setErrorResponse("Data Top Up Failed");
          }
      }).catch((error) => {
            // setIsloading(false);
            console.log("this is the error response gotten", error);
            setTimeout(() => {
                Router.replace("/dashboards/home");
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
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-slide-title" variant="h4" textAlign="center" style={{ marginTop: '2em' }}>
              Transaction Details
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
                <p><b style={{ fontWeight: '900', fontSize: '16px', color: "#000" }}>Beneficiary Phone number: </b><br/> {phone} </p>
                <p><b style={{ fontWeight: '900', fontSize: '16px', color: "#000" }}>Value Amount: </b><br/>₦{amount} </p>
                <p><b style={{ fontWeight: '900', fontSize: '16px', color: "#000" }}>Amount To Pay: </b><br/>₦{amountTP}  </p>
                <p><b style={{ fontWeight: '900', fontSize: '16px', color: "#000" }}>Payment Description: </b><br/>{paymentDesc}  {phone} </p>
                </Typography>
              </DialogContentText>
            </DialogContent>  
            <DialogActions>
              {acctype && acctype=="airtime" ? <Button onClick={completeAirtime} sx={{ mt: 2 }} variant="contained" color="success">
                Buy Airtime
              </Button> : <Button onClick={completeData} sx={{ mt: 2 }} variant="contained" color="success">
                Buy Data
              </Button> }
              <Button onClick={handleClose} variant="contained" color="danger" sx={{ mt: 2 }}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
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
                  {acctype && acctype=="airtime" ?
                      <MenuItem value="Airtime">Airtime</MenuItem> : 
                    <MenuItem value="Data">Data</MenuItem>  
                  }
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
              {  paymentType && amount && (paymentType == "Card") ? " "  :  data.isPin == true ? <div><CustomFormLabel htmlFor="Email">Enter Transaction PIN</CustomFormLabel>
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
                /></div>  : <Box sx={{ mt: 6}}> Kindly Create Your Transaction PIN to complete this transaction by <NextLink href="/dashboards/set-pin">Clicking Me</NextLink>  </Box>  }
              </>                
              </Grid>
              {/* <Box height={14} /> */}
              <Grid item xs={12} lg={6}>
                {paymentType && amount && (paymentType == "Card") ? 
                  <PaystackButton className={styles.paystack__button} {...componentProps} /> : 
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!isValid || !dirty}
                  >
                  Purchase
                </Button>}
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