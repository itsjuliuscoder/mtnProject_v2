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

const Dashboard1 = () => {
  const [open, setOpen] = useState(false);
  const [openPinModal, setPinModal] = useState(false);
  const [ isloading, setIsloading ] = useState(true);
  const [userData, setUserData] = useState("");
  const [userResponseData, setUserResponseData] = useState("");
  const [ response, setResponse ] = useState('');
  const [ errorResponse, setErrorResponse ] = useState('');
  const [ accessToken, setAccessToken ] = useState(''); 
  const [currentTimeGreetings, setTimeGreeting] = useState("");

  const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
  ));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePinClose = () => {
    setPinModal(false);
  };

  React.useEffect(() =>{
    setTimeout(() => setIsloading(false), 6000);
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    setAccessToken(token);
    setUserData(currentUser);
    // retrieveUserDetails();
    currentDate();
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

  return (
    <>
    { isloading ? <BeatLoader color="#000" loading={isloading} cssOverride={{ margin: '22em auto', width: '10%', display: 'block' }} size={30} /> :
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6}>
          <WelcomeCard data={userData} time={currentTimeGreetings} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={0}>
            <Grid item xs={12} lg={6} sm={6}>
              <Earnings data={userData} />
            </Grid>
            <Grid item xs={12} lg={6} sm={6}>
              <MonthlySales />
            </Grid>
          </Grid>
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <Grid item xs={12} lg={3}>
          <EarningsShop title="MTN" logo={mtn} clickAction={handleClickOpen} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="GLO" logo={glo} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="AIRTEL" logo={airtel} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="9MOBILE" logo={mobile} />
        </Grid>
        {/* ------------------------- row 3 ------------------------- */}
        <Grid item xs={12} lg={3}>
          <EarningsShop title="DSTV/GOTV" logo={utility} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="UTILITY BILLS" logo={utility} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="TRANSFER" logo={utility} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <EarningsShop title="BORROW AIRTIME & LOAN" logo={utility} />
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <ProductPerformance data={userData} />
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        {/* <Grid item xs={12} lg={12}>
          <MedicalProBranding />
        </Grid>       */}
        
        <Dialog
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
            {/* <Button onClick={handleClose} color="primary" variant="contained">
              Send
            </Button> */}
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

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
      </Grid> 
    }
    </>
  );
};

export default Dashboard1;
