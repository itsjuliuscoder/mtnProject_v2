import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import { Card, CardContent, Typography, Box, Fab, Button } from "@mui/material";
import NextLink from "next/link";
import axios from "axios";

const Earnings = ({ data }) => {
  
  const [open, setOpen] = useState(false);
  const [openPinModal, setPinModal] = useState(false);
  const [ isloading, setIsloading ] = useState(true);
  const [userData, setUserData] = useState("");
  
  const [balanceAmount, setBalanceAmount] = useState("");

  React.useEffect(() =>{
    setTimeout(() => setIsloading(false), 6000);
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    // setAccessToken(token);
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
        phone_number: data.phone_number,
        user_id: data._id
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

  return (<Card
    sx={{
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: "white",
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Typography
          variant="h3"
          sx={{
            marginBottom: "0",
          }}
          gutterBottom
        >
          Wallet
        </Typography>
      </Box>
      <Typography
        variant="h1"
        fontWeight="500"
        sx={{
          marginBottom: "0",
          marginTop: "15px",
        }}
        gutterBottom
      >
        ₦{data && balanceAmount ? balanceAmount : "0"}
      </Typography>
      <NextLink href="/dashboards/topup-wallet">
          <Button
            sx={{
              marginTop: '15px',
            }}
            variant="contained"
            color="primary"
          >
            Top Up Wallet
          </Button>
      </NextLink>
    </CardContent>
  </Card>);
};

export default Earnings;
