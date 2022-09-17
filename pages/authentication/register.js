import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import Alert from "@mui/material/Alert";

import CustomCheckbox from "../../src/components/forms/custom-elements/CustomCheckbox";
import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";
import ErrorToaster from "../../src/components/dashboard/dashboard1/ErrorToaster";
import CustomSelect from "../../src/components/forms/custom-elements/CustomSelect";
import SizesAutocomplete from "../../src/components/forms/autoComplete/SizesAutocomplete";
import { Select, MenuItem } from '@mui/material';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/lab';
import MoonLoader from "react-spinners/MoonLoader";

import img2 from "../../assets/images/backgrounds/login-bg.svg";
import img1 from "../../assets/images/backgrounds/login2.png";
import LogoIcon from "../../src/layouts/logo/LogoIcon";
import axios from "axios";
import moment from "moment";

const Register = () => {

  const router = useRouter();

  const selectData = [
    { label: 'Individual', value: 'Individual'  },
    { label: 'Merchant', value: 'Merchant' }
  ];

  const [ first_name, setFirstname ] = useState('');
  const [ last_name, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ referral_code, setReferral ] = useState('');
  const [ phone_number, setPhonenumber ] = useState('');
  const [ dob, setDOB ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ acctype, setAcctype ] = useState('');
  const [ responseMessage, setResponseMessage ] = useState('');
  const [ errorResponse, setErrorResponse ] = useState('');
  const [ selected, setSelected ] = useState('');
  const [value2, setValue2] = React.useState(null);
  const [ isloading, setIsloading ] = useState(false);

  const selectionChangeHandler = e => {

  }; 


  const handleSubmit = e => {
    e.preventDefault();

    const date_of_birth = moment(value2).format("yyyy-M-D");
    const email_address = (email === null) ? "" : email;
    const referral = (referral_code === null) ? "" : referral_code;
    
    // console.log("this are the data -->", phone_number, password, first_name, last_name, email_address, referral, dob, date_of_birth, acctype);
    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/register',
      data:{
        firstname: first_name,
        lastname: last_name,
        phone_number: phone_number,
        email: email,
        dob: date_of_birth,
        referral_code: referral,
        password: password,
        acctype: acctype
      }
    }).then(function(response){
        console.log("this is the response data -->", response.data);
        if(response.data.statusCode === "000"){
          router.push('/authentication/login');
          setResponseMessage(response.data.statusMessage);
          setTimeout(setEmptyAlert, 5000);
        } else {
          console.log("this is the response gotten", response);
        }
    }).catch((error) => {
        setErrorResponse("Unable to register user");
        setTimeout(setEmptyAlert, 5000);
    })
  };

  const handleChange = (event) => {
    setAcctype(event.target.value);
  };

  const setEmptyAlert = () => {
    setResponseMessage("");
    setErrorMessage("");
  } 

  return (
    <Grid container sx={{ height: "100vh", justifyContent: "center" }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={6}
        sx={{
          background: (theme) =>
            `${theme.palette.mode === "dark" ? "#1c1f25" : "#ffffff"}`,
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              position: {
                xs: "relative",
                lg: "absolute",
              },
              height: { xs: "auto", lg: "100vh" },
              right: { xs: "auto", lg: "-50px" },
              margin: "0 auto",
            }}
          >
            <Image src={img1} alt="bg" maxWidth="812" />
          </Box>
  
          <Box
            sx={{
              p: 4,
              position: "absolute",
              top: "0",
            }}
          >
            <LogoIcon />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
        <Grid container spacing={0} display="flex" justifyContent="center">
          <Grid item xs={12} lg={9} xl={6}>
            <Box
              sx={{
                p: 4,
              }}
            >
              <Typography fontWeight="700" variant="h2">
                Welcome to rightNet
              </Typography>
              { errorResponse && <ErrorToaster title={ errorResponse } /> }
              { responseMessage && <ErrorToaster title={ responseMessage } /> }
              <Box display="flex" alignItems="center">
                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight="500"
                  sx={{
                    mr: 1,
                  }}
                >
                  Already a user?
                </Typography>
                <NextLink href="/authentication/login">
                  <Typography
                    fontWeight="500"
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      color: "primary.main",
                      cursor: "pointer",
                    }}
                  >
                    Login here
                  </Typography>
                </NextLink>
              </Box>
              <Box
                sx={{
                  mt: 4,
                }}
              > 
              <form onSubmit={handleSubmit}>
                <CustomFormLabel htmlFor="first_name">First Name</CustomFormLabel>
                <CustomTextField 
                  type="text"
                  placeholder="Enter First Name"
                  name="first_name" 
                  id="first_name" 
                  variant="outlined" 
                  fullWidth 
                  required 
                  value={first_name}
                  onChange={e => setFirstname(e.target.value)} />
                <CustomFormLabel htmlFor="last_name">Last name</CustomFormLabel>
                <CustomTextField 
                  type="text"
                  placeholder="Enter Last name"
                  name="last_name" 
                  id="last_name" 
                  variant="outlined" 
                  fullWidth 
                  required 
                  value={last_name}
                  onChange={e => setLastname(e.target.value)} />
                <CustomFormLabel htmlFor="phone_number">Phone number</CustomFormLabel>
                <CustomTextField 
                  type="number"
                  placeholder="Enter Phone number"
                  name="phone_number" 
                  id="phone_number" 
                  variant="outlined" 
                  fullWidth 
                  required 
                  value={phone_number}
                  onChange={e => setPhonenumber(e.target.value)} />
                <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                <CustomTextField 
                  type="email"
                  placeholder="Enter Email Address"
                  name="email" 
                  id="email" 
                  variant="outlined" 
                  fullWidth  
                  value={email}
                  onChange={e => setEmail(e.target.value)} />
                <CustomFormLabel htmlFor="dob">Date of Birth</CustomFormLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={value2}
                        onChange={(newValue2) => {
                          setValue2(newValue2);
                        }}
                        renderInput={(params) => (
                          <CustomTextField
                            size="small"
                            {...params}
                            fullWidth
                            id="date"
                            sx={{
                              '& .MuiSvgIcon-root': {
                                width: '18px',
                                height: '18px',
                              },
                              '& .MuiFormHelperText-root': {
                                display: 'none',
                              },
                            }}
                          />
                        )}
                      />
                  </LocalizationProvider>
                <CustomFormLabel htmlFor="dob">Referral Code</CustomFormLabel>
                <CustomTextField 
                  type="referral_code"
                  placeholder="Enter Referral Code"
                  name="referral_code" 
                  id="referral_code" 
                  variant="outlined" 
                  fullWidth  
                  value={referral_code}
                  onChange={e => setReferral(e.target.value)} />                
                  <CustomFormLabel htmlFor="acctype">Select Account Type</CustomFormLabel>
                  <CustomSelect
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={acctype}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Merchant">Merchant</MenuItem>
                  </CustomSelect>
                <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                <CustomTextField
                  name="password"
                  placeholder="Enter Password"
                  id="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  sx={{
                    mb: 3,
                  }}
                />
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      sm: "flex",
                      lg: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      ml: "auto",
                    }}
                  >
                    <NextLink href="/">
                      <Typography
                        fontWeight="500"
                        sx={{
                          display: "block",
                          textDecoration: "none",
                          mb: "16px",
                          color: "primary.main",
                          cursor: "pointer",
                        }}
                      >
                        Already have an account ? Kindly login
                      </Typography>
                    </NextLink>
                  </Box>
                </Box>
                {/* <NextLink href="/"> */}
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      pt: "10px",
                      pb: "10px",
                    }}
                    onClick={() => setIsloading(!isloading)}
                  >
                    {isloading ? <MoonLoader color="#fff" loading={isloading} size={30} />: 'Sign Up' }
                  </Button>
                {/* </NextLink> */}
              </form>
                <Box
                  sx={{
                    position: "relative",
                    textAlign: "center",
                    mt: "20px",
                    mb: "20px",
                    "&::before": {
                      content: '""',
                      background: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#ecf0f2"
                        }`,
                      height: "1px",
                      width: "100%",
                      position: "absolute",
                      left: "0",
                      top: "13px",
                    },
                  }}
                >
                  <Typography
                    component="span"
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      position: "relative",
                      padding: "0 12px",
                      background: (theme) =>
                        `${theme.palette.mode === "dark" ? "#282c34" : "#fff"}`,
                    }}
                  >
                    or sign in with
                  </Typography>
                </Box>
  
                <Box>
                  <Button
                    variant="outlined"
                    size="large"
                    display="flex"
                    alignitems="center"
                    justifycontent="center"
                    sx={{
                      width: "100%",
                      borderColor: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                        }`,
                      borderWidth: "2px",
                      textAlign: "center",
                      mt: 2,
                      pt: "10px",
                      pb: "10px",
                      "&:hover": {
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <GoogleIcon
                        sx={{
                          color: (theme) => theme.palette.error.main,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          ml: 1,
                          color: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? theme.palette.grey.A200
                                : "#13152a"
                            }`,
                        }}
                      >
                        Google
                      </Typography>
                    </Box>
                  </Button>
                </Box>
  
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Button
                      variant="outlined"
                      size="large"
                      display="flex"
                      alignitems="center"
                      justifycontent="center"
                      sx={{
                        width: "100%",
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                        textAlign: "center",
                        mt: 2,
                        pt: "10px",
                        pb: "10px",
                        "&:hover": {
                          borderColor: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? "#42464d"
                                : "#dde3e8"
                            }`,
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <FacebookIcon
                          sx={{
                            color: (theme) => theme.palette.secondary.main,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 1,
                            color: (theme) =>
                              `${
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey.A200
                                  : "#13152a"
                              }`,
                          }}
                        >
                          Facebook
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} lg={6}>
                    <Button
                      variant="outlined"
                      size="large"
                      display="flex"
                      alignitems="center"
                      justifycontent="center"
                      sx={{
                        width: "100%",
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                        textAlign: "center",
                        mt: 2,
                        pt: "10px",
                        pb: "10px",
                        "&:hover": {
                          borderColor: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? "#42464d"
                                : "#dde3e8"
                            }`,
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <TwitterIcon
                          sx={{
                            color: (theme) => theme.palette.primary.main,
                          }}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            ml: 1,
                            color: (theme) =>
                              `${
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey.A200
                                  : "#13152a"
                              }`,
                          }}
                        >
                          Twitter
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;

