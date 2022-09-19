import React, {useState, useEffect} from 'react';
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
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import CustomTextField from '../custom-elements/CustomTextField';
import CustomSelect from '../custom-elements/CustomSelect';
import CustomRadio from '../custom-elements/CustomRadio';
import CustomFormLabel from '../custom-elements/CustomFormLabel';
import MoonLoader from "react-spinners/MoonLoader";
import ErrorToaster from "../../dashboard/dashboard1/ErrorToaster"
import SuccessToaster from "../../dashboard/dashboard1/SuccessToaster";
import axios from "axios";

const currencies = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const countries = [
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'srilanka',
    label: 'Srilanka',
  },
];

const FbBasicHeaderForm = () => {
  const [currency, setCurrency] = React.useState('');
  

  const handleChange2 = (event) => {
    setCurrency(event.target.value);
  };

  const [selectedValue, setSelectedValue] = React.useState('');
  const [pin, setPin] = React.useState('');
  const [rPin, setRPin] = React.useState('');
  const [ isloading, setIsloading ] = useState(false);
  const [ response, setResponse ] = useState('');
  const [ errorResponse, setErrorResponse ] = useState('');
  const [userData, setUserData] = useState("");
  const [ accessToken, setAccessToken ] = useState(''); 

  const handleChange3 = (event) => {
    setSelectedValue(event.target.value);
  };

  const [country, setCountry] = React.useState('');

  const handleChange4 = (event) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    setAccessToken(token);
    setUserData(currentUser);
  }, []);

  const handleSubmit = e => {

    setIsloading(true);
    e.preventDefault();
    console.log("this are the data -->", pin, rPin);

    const headers = {
      Accept: "application/json",
      Authorization: accessToken ? accessToken : "No Auth"
    }

    if(pin == rPin){
        axios({
          method: 'post',
          url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/create_transactionPin',
          headers,
          data:{
            phone_number: userData.phone_number,
            user_id: userData._id,
            pin: rPin
          }
        }).then(function(response){
            console.log("this is the response data -->", response.data);
            setIsloading(false);
            if(response.data.statusCode === "000"){
              setResponse(response.data.statusMessage);
            } else {
              console.log("this is the response gotten", response);
              setErrorResponse("Unable to create PIN");
            }
        }).catch((error) => {
            setIsloading(false);
            console.log("this is the error response gotten");
            setErrorResponse("Unable to create PIN");
            setTimeout(setEmptyAlert, 5000);
        })
    } else {
      setErrorResponse("PIN Do not Match");
    }
  };

  React.useEffect(() =>{
    setTimeout(() => setIsloading(false), 6000);
  });

  const setEmptyAlert = () => {
    setResponse("");
    setErrorResponse("");
  }

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
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
            <Typography fontWeight="500" variant="h4">
              Create Transaction PIN
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          display="flex"
          alignItems="center"
          p={2}
          sx={{
            backgroundColor: 'primary.light',
            color: 'primary.main',
          }}
        >
          <FeatherIcon icon="alert-circle" width="18" />
          <Box sx={{ ml: 1 }}>This PIN will be used to buy Airtime and Data</Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <CardContent
            sx={{
              padding: '30px',
            }}
          >
            <Grid container spacing={3}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor="city-text"
                >
                  Enter PIN
                </CustomFormLabel>
                <CustomTextField 
                  type="password"
                  placeholder="Enter PIN"
                  name="rPin" 
                  id="rPin" 
                  variant="outlined" 
                  fullWidth 
                  required 
                  value={rPin}
                  onChange={e => setRPin(e.target.value)}
                  size="small"
                  />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor="state-text"
                >
                  Enter PIN Again
                </CustomFormLabel>
                <CustomTextField 
                  type="password"
                  placeholder="Enter PIN"
                  name="pin" 
                  id="pin" 
                  variant="outlined" 
                  fullWidth 
                  required 
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  size="small"
                  />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box p={3}>
            <Button
              variant="contained"
              color="error"
              sx={{
                mr: 1,
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" onClick={() => setIsloading(!isloading)} >
            {isloading ? <MoonLoader color="#fff" loading={isloading} size={30} /> : 'Create Pin' }
            </Button>
            
          </Box>
        </form>
        { errorResponse && <ErrorToaster title={ errorResponse } /> }
        { response && <SuccessToaster title={ response } /> }
      </Card>
    </div>
  );
};

export default FbBasicHeaderForm;
