import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

// import CoverCard from '../../src/components/profile/CoverCard';
import CoverCard from '../../src/components/profile/CoverCard';
import IntroCard from '../../src/components/profile/IntroCard';
import PhotosCard from '../../src/components/profile/PhotosCard';
import NewPost from '../../src/components/profile/NewPost';
import ImgPost from '../../src/components/profile/ImgPost';
import TypographyPost from '../../src/components/profile/TypographyPost';
import axios from "axios";
import BounceLoader from "react-spinners/BounceLoader";

const UserProfile = () => {
  const [ isloading, setIsloading ] = useState(true);
  const [userData, setUserData] = useState("");
  const [ errorResponse, setErrorResponse ] = useState('');
  const [ accessToken, setAccessToken ] = useState(''); 
  const [balanceAmount, setBalanceAmount] = useState("");
  const [response, setResponse] = useState("");  

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    setAccessToken(token);
    setUserData(currentUser);
    retrieveUserDetails();
    // currentDate();
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



  const setEmptyAlert = () => {
    setResponse("");
    setErrorResponse("");
  }


  return (
    <>
      <CoverCard data={userData} balAmount={balanceAmount} />
      <Grid container spacing={0}>
        <Grid item sm={12} lg={4} xs={12}>
          <IntroCard data={userData} />
          <PhotosCard data={userData} />
        </Grid>
        <Grid item sm={12} lg={8} xs={12}>
          <NewPost data={userData} />
          <ImgPost data={userData} />
          <TypographyPost data={userData} />
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfile;
