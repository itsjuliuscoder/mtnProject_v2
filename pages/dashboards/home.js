import { Grid } from '@mui/material';
import React, { useState, useEffect } from "react";
import airtime from "../../assets/images/logos/airtime_topup.png";
import mtn from "../../assets/images/logos/mtn.png"
import mobile from "../../assets/images/logos/9mobile.png"
import airtel from "../../assets/images/logos/airtel.png"
import glo from "../../assets/images/logos/glo.png"
import utility from "../../assets/images/logos/utility.png"
import transfer from "../../assets/images/logos/transfer.png"
import data from "../../assets/images/logos/data_sub.png";
import cable from "../../assets/images/logos/cable_tv_sub.png";
import cashback from "../../assets/images/logos/cash_back.png";
// import loan from "../../assets/images/logos/Loans.png";
import ErrorToaster from "../../src/components/dashboard/home/ErrorToaster";
import {
  List,
  Divider,
  Button,
  Box,
  Dialog,
  DialogTitle,
  Slide,
  DialogContent,
  DialogActions,
  DialogContentText,
  Modal,
  Typography
} from "@mui/material";
import {
    WelcomeCard,
    BlogCard,
    Earnings,
    MonthlySales,
    SalesOverview,
    TotalSales,
    ProductPerformance,
    MedicalProBranding,
    WeeklyStats,
    DailyActivities,
    EarningsShop, 
    Pricing,
    Monthly
  } from '../../src/components/dashboard/home';

import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";
import styles from "../../styles/Component.module.css";
import NextLink from "next/link";
import Router from "next/router";


const Home = () => {
  const [open, setOpen] = useState(false);
  const [openPinModal, setPinModal] = useState(false);
  const [ isloading, setIsloading ] = useState(true);
  const [userData, setUserData] = useState("");
  const [userResponseData, setUserResponseData] = useState("");
  const [pinStatus, setPinStatus] = useState("");
  const [ response, setResponse ] = useState('');
  const [ errorResponse, setErrorResponse ] = useState('');
  const [ accessToken, setAccessToken ] = useState('');
  const [ pinModalCheck, setPinModalCheck ] = useState(false);  
  const [currentTimeGreetings, setTimeGreeting] = useState("");
  const [referralCount, setReferralCount] = useState("");

  const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
  ));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setPinModalCheck(false)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handlePinClose = () => {
    setPinModal(false);
  };

  React.useEffect(() =>{
    setTimeout(() => setIsloading(false), 3000);
  });

  // React.useEffect(() => {
  //   if(isPin == false){
  //       setTimeout(() => {
  //         Router.replace("/dashboards/set-pin");
  //     }, 7000) 
  //   }
  // });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    setAccessToken(token);
    setUserData(currentUser);
    retrieveUserDetails();
    validateToken();
    getReferrals();
    // ((userData.isPin == false)) ? setPinModalCheck(true) : setPinModalCheck(false);
    currentDate();
    if(userData.isPin == false){
      setTimeout(() => {
            Router.replace("/dashboards/set-pin");
      }, 4000)
    }
    // localStorage.setItem('isPin', userData.isPin);
    // const pinStat = localStorage.getItem("isPin");
    // setPinStatus(pinStat);
  }, []);

  const setEmptyAlert = () => {
    setResponse("");
    setErrorResponse("");
  }

  const todayDate = new Date();
  
  function currentDate(){
    let curHr = todayDate.getHours();
    if(curHr < 12) {
      setTimeGreeting("Good Morning");
    }else if(curHr <= 18) {
        setTimeGreeting("Good Afternoon");
    }else if(curHr <= 23){
        setTimeGreeting("Good Evening");
    }
  }

  const retrieveUserDetails = () => {

    const token = localStorage.getItem("userToken");

    setIsloading(true);
    const headers = {
      Accept: "application/json",
      // Authorization: accessToken ? accessToken : "No Auth"
      Authorization: token
    }

    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/get_UserDetails',
      headers,
      data: {
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

  const getReferrals = () => {

    const token = localStorage.getItem("userToken");

    setIsloading(true);
    const headers = {
      Accept: "application/json",
      // Authorization: accessToken ? accessToken : "No Auth"
      // Authorization: token
    }

    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/get_referrals',
      headers,
      data: {
        phone_number: userData.phone_number
      }
    }).then(function(response){
        console.log("this is the referral response data -->", response.data);
        setIsloading(false);
        if(response.data.statusCode === "000"){
          // setUserResponseData(response.data.payload);
          setReferralCount(response.data.totalReferrals);
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

  const validateToken = () => {

    const currentUser = JSON.parse(localStorage.getItem("userData"));

    const token = localStorage.getItem("userToken");

    

    const headers = {
      Accept: "application/json",
      Authorization: token
      //Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA5MDI1MDE1NTY2IiwicGFzc3dvcmQiOiJQYXNzd29yZEBjb2Rlcjk3IiwiaWF0IjoxNjY1MTI0MTk4LCJleHAiOjE2NjUxMzEzOTh9.seLAyLNeTH6bSvTmwOP8smZMtKBPGzGttfIIuW328823vvjvdav"
    }

    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/validate_token',
      headers,
      data: {
        phone_number: currentUser.phone_number,
      }
    }).then(function(response){
        console.log("this is the response data -->", response.data);
        setIsloading(false);
        if(response.data.statusCode === "000"){
          // setUserResponseData(response.data.payload);
          console.log("")
        } else {
          console.log("this is the response gotten", response);
          setErrorResponse("Token Expired, Login Again!!!");
          setTimeout(() => {
            Router.replace("/authentication/login");
          }, 1000);
        }
    }).catch((error) => {
        setIsloading(false);
        console.log("this is the error response gotten", error);
        setTimeout(() => {
          Router.replace("/authentication/login");
        }, 1000);
        //setErrorResponse("Invalid Login Credentials");
        setTimeout(setEmptyAlert, 5000);
    })
  };

  return (
    <>
    { isloading ? <BounceLoader color="#000" loading={isloading} cssOverride={{ margin: '22em auto', width: '10%', display: 'block' }} size={50} /> :
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        
          <Grid container spacing={0}>
            <Grid item xs={12} lg={6} sm={3}>
              <WelcomeCard data={userData} time={currentTimeGreetings} clickAction={handleClickOpen} />
            </Grid>
            <Grid item xs={12} lg={6} sm={3}>
              <Earnings data={userData} />
            </Grid>
            <Grid item xs={12} lg={6} sm={3}>
              <MonthlySales data={userData} />
            </Grid>
            <Grid item xs={12} lg={6} sm={3}>
              <Monthly data={userData} referral={referralCount} />
            </Grid>
          </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <Grid item xs={12} lg={3}>
          <EarningsShop title="Airtime Topup" logo={airtime} link="airtime" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="Data Subscription" logo={data} link="data"  />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <Grid item xs={12} lg={3}>
          <EarningsShop title="Utility Bills" logo={utility} color="#fff" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="Transfer" logo={transfer} color="#fff" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="Cable Subscription" logo={cable} color="#fff" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="Cash Back" logo={cashback} color="#fff" />
        </Grid>
        {/* <Grid item xs={12} lg={3}>
          <EarningsShop title="Loan" logo={loan} color="#fff" />
        </Grid> */}
        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <ProductPerformance data={userData} />
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        {/* <Grid item xs={12} lg={12}>
          <MedicalProBranding />
        </Grid>       */}
        
        {/* <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          fullWidth
        >
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            <Pricing />
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
              Send
            </Button> */}
            {/* <Button onClick={handleClose} color="secondary">
              Cancel
            </Button> */}
          {/* </DialogActions>
        </Dialog> */}

        <Dialog
          open={openPinModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={handlePinClose}
          fullWidth
        >
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            <Pricing />
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary" variant="contained">
              Send
            </Button> */}
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Modal
          open={pinModalCheck}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modal___window_1}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
                Hi {userData && userData.firstname ? userData.firstname : ""}, Welcome to rightNet Click the link below to create transaction pin
            </Typography>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              <NextLink href="/dashboards/set-pin">
                <Button
                  sx={{
                    marginTop: '15px',
                    backgroundColor: '#000'
                  }}
                  variant="contained"
                >
                  Click Here
                </Button>
              </NextLink>
            </Typography>
          </Box>
        </Modal>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modal___window}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Pricing />
            </Typography>
          </Box>
        </Modal>
      </Grid> 
    }
    { errorResponse && <ErrorToaster title={ errorResponse } /> }
    </>
  );
};

export default Home;
