import { Grid } from '@mui/material';
import React, { useState, useEffect } from "react";
import mtn from "../../assets/images/logos/mtn.png"
import mobile from "../../assets/images/logos/9mobile.png"
import airtel from "../../assets/images/logos/airtel.png"
import glo from "../../assets/images/logos/glo.png"
import utility from "../../assets/images/logos/utility.png"
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
    Pricing
  } from '../../src/components/dashboard/dashboard1';

import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import styles from "../../styles/Component.module.css";
import NextLink from "next/link";
import Router from "next/router";



const Dashboard1 = () => {
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

  return (
    <>
    { isloading ? <BeatLoader color="#000" loading={isloading} cssOverride={{ margin: '22em auto', width: '10%', display: 'block' }} size={30} /> :
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6}>
          <WelcomeCard data={userData} time={currentTimeGreetings} clickAction={handleClickOpen} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={6} sm={6}>
              <Earnings data={userData} />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <MonthlySales data={userData} />
            </Grid>
          </Grid>
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <Grid item xs={12} lg={3}>
          <EarningsShop color="#C5C5C5" title="MTN" logo={mtn} clickAction={handleClickOpen} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="GLO" logo={glo} color="#C5C5C5" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="AIRTEL" logo={airtel} color="#C5C5C5" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="9MOBILE" logo={mobile} color="#C5C5C5" />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <Grid item xs={12} lg={3}>
          <EarningsShop title="DSTV/GOTV" logo={utility} color="#C5C5C5" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="UTILITY BILLS" logo={utility} color="#C5C5C5" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="TRANSFER" logo={utility} color="#C5C5C5" />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="BORROW AIRTIME & LOAN" logo={utility} color="#C5C5C5"  />
        </Grid>
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
    </>
  );
};

export default Dashboard1;
