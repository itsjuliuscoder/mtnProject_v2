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
import FbBasicHeaderForm from '../../src/components/forms/fb-elements/FbBasicHeaderForm';

const Wallet = () => {
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
    setTimeout(() => setIsloading(false), 3000);
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
    { isloading ? <BeatLoader color="#000" loading={isloading} cssOverride={{ margin: '22em auto', width: '10%', display: 'block' }} size={30} /> :
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={6}>
            <Earnings data={userData} />
        </Grid>
        <Grid item xs={12} lg={12}>
            <ProductPerformance data={userData} />
        </Grid>      
      </Grid> 
    }
    </>
  );
};

export default Wallet;
