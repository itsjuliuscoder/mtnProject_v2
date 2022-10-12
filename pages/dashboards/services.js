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
// import loan from "../../assets/images/logos/loans.png";

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
  } from '../../src/components/dashboard/home';

import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";
import FbBasicHeaderForm from '../../src/components/forms/fb-elements/FbBasicHeaderForm';

const Services = () => {
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
    setTimeout(() => setIsloading(false), 5000);
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    setAccessToken(token);
    setUserData(currentUser);
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
    { isloading ? <BounceLoader color="#000" loading={isloading} cssOverride={{ margin: '22em auto', width: '20%', display: 'block' }} size={50} /> :
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
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
          <EarningsShop title="Cash Back" logo={cable} color="#fff" />
        </Grid>
        {/* <Grid item xs={12} lg={3}>
          <EarningsShop title="Loan" logo={loan} color="#fff" />
        </Grid> */}
      </Grid> 
    }
    </>
  );
};

export default Services;
