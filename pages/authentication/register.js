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

import CustomCheckbox from "../../src/components/forms/custom-elements/CustomCheckbox";
import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";
import CustomSelect from "../../src/components/forms/custom-elements/CustomSelect";
import SizesAutocomplete from "../../src/components/forms/autoComplete/SizesAutocomplete";
import { Select, MenuItem } from '@mui/material';

import img2 from "../../assets/images/backgrounds/login-bg.svg";
import img1 from "../../assets/images/backgrounds/login2.png";
import LogoIcon from "../../src/layouts/logo/LogoIcon";
import axios from "axios";

const Register = () => {

  const router = useRouter();

  const [ firstname, setFirstname ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ referral, setReferral ] = useState('');
  const [ phone_number, setPhonenumber ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ acctype, setAcctype ] = useState('');
  const [ response, setResponse ] = useState('');
  const [ errorResponse, setErrorResponse ] = useState('');
  const [ selected, setSelected ] = useState('');

  const selectionChangeHandler = e => {

  }; 


  const handleSubmit = e => {
    e.preventDefault();
    // console.log("this are the data -->", phone_number, password);

    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/register',
      data:{
        firstname:"Mercy",
        lastname:"Bankole",
        phone_number:"08034331177",
        email: "mercy_ya@gmail.com",
        dob:"12/09/1992",
        referral_code:"09025015566",
        password:"password@134",
        acctype:"individual"
      }
    }).then(function(response){
        console.log("this is the response data -->", response.data);
        if(response.data.statusCode === "000"){
          router.push('/authentication/login');
          setResponse(response.data.statusMessage);
        } else {
          console.log("this is the response gotten", response);
        }
    }).catch((error) => {
        setErrorResponse("Unable to register user");
    })
  };

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
              <Box display="flex" alignItems="center">
                <Typography
                  color="textSecondary"
                  variant="h6"
                  fontWeight="500"
                  sx={{
                    mr: 1,
                  }}
                >
                  New to rightNet?
                </Typography>
                <NextLink href="/authentication/register">
                  <Typography
                    fontWeight="500"
                    sx={{
                      display: "block",
                      textDecoration: "none",
                      color: "primary.main",
                      cursor: "pointer",
                    }}
                  >
                    Create an account
                  </Typography>
                </NextLink>
              </Box>
              <Box
                sx={{
                  mt: 4,
                }}
              > 
              <form onSubmit={handleSubmit}>
                <CustomFormLabel htmlFor="phone_number">Phone numbaer</CustomFormLabel>
                <CustomTextField 
                  type="number"
                  placeholder="Enter Phone Number"
                  name="phone_number" 
                  id="phone_number" 
                  variant="outlined" 
                  fullWidth 
                  required 
                  value={phone_number}
                  onChange={e => setPhonenumber(e.target.value)} />
                  <CustomFormLabel htmlFor="acctype">Select Account Type</CustomFormLabel>
                  <SizesAutocomplete />
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
                  >
                    Sign In
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

