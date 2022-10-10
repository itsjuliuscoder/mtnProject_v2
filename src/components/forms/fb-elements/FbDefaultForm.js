import React from 'react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  FormControlLabel,
  Button,
  Grid,
  RadioGroup,
  FormControl,
  MenuItem,
} from '@mui/material';
import CustomTextField from '../custom-elements/CustomTextField';
import CustomSelect from '../custom-elements/CustomSelect';
import CustomCheckbox from '../custom-elements/CustomCheckbox';
import CustomRadio from '../custom-elements/CustomRadio';
import CustomFormLabel from '../custom-elements/CustomFormLabel';
import { PaystackButton } from 'react-paystack'; 
import styles from "../../../../styles/Component.module.css";
import MoonLoader from "react-spinners/MoonLoader";
import axios from "axios";
import ErrorToaster from "../../dashboard/home/ErrorToaster"
import SuccessToaster from "../../dashboard/home/SuccessToaster";
import { useRouter } from "next/router";

const FbDefaultForm = ({ data }) => {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const [value, setValue] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [ isloading, setIsloading ] = React.useState(false);
  const [ response, setResponse ] = React.useState('');
  const [ errorResponse, setErrorResponse ] = React.useState('');
  const [ accessToken, setAccessToken ] = React.useState(''); 

  React.useEffect(() => {
    // const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    setAccessToken(token);
    // setUserData(currentUser);
  }, []);


  // const [config, setConfig] = React.useState({
  //   reference: (new Date()).getTime().toString(),
  //   email: data && data.email ? data.email : "techcapacitybuilder@gmail.com",
  //   amount: amount ? amount : "1000",
  //   publicKey: 'pk_test_cdbf19c426a4d163dd3e939e53edde7f831fd6b6',
  // });

  // const config = {
  //   reference: (new Date()).getTime().toString(),
  //   email: data && data.email ? data.email : "techcapacitybuilder@gmail.com",
  //   amount: amount ? amount : "100",
  //   publicKey: 'pk_test_cdbf19c426a4d163dd3e939e53edde7f831fd6b6',
  // };
  const Router = useRouter();

  const handlePaystackSuccessAction = (reference) => {  
    // Implementation for whatever you want to do with reference and after success call.

    const headers = {
      Accept: "application/json",
      Authorization: accessToken ? accessToken : "No Auth"
    }
    
    console.log("this is the wallet balance here -->", data.wallet_balance);
    
    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/wallet_transaction',
      headers,
      data: {
        reference_id: reference.trxref,
        user_id: data._id,
        fullname: data.firstname + " " + data.lastname,
        phone_number: data.phone_number,
        amount: amount,
        // previous_balance: data && data.wallet_balance ? data.wallet_balance : " ",
        description: "Wallet Top up with amount " + amount + " was successful"
      }
    }).then(function(response){
        console.log("this is the response data -->", response.data);
        setIsloading(false);
        if(response.data.statusCode === "000"){
          setResponse(response.data.statusMessage);
          setTimeout(() => {
            Router.replace("/dashboards/home");
          }, 3000)
        } else {
          console.log("this is the response gotten", response);
          setErrorResponse("Unable to create PIN");
        }
    }).catch((error) => {
        setIsloading(false);
        console.log("this is the error response gotten");
        setErrorResponse("Wallet Top Up failed");
        setTimeout(setEmptyAlert, 5000);
    })

    console.log(reference);
  };

  React.useEffect(() =>{
    setTimeout(() => setIsloading(false), 3000);
  });

  const setEmptyAlert = () => {
    setResponse("");
    setErrorResponse("");
  }

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const handleSubmit = e => { 
      console.log("this is the amount -->", amount)


  }

  const componentProps = {
    amount: amount ? (amount * 100) : "100", 
    reference: (new Date()).getTime().toString(),
    email: data && data.email ? data.email : "techcapacitybuilder@gmail.com",
    publicKey: 'pk_test_cdbf19c426a4d163dd3e939e53edde7f831fd6b6',
    text: 'Top Up Wallet',
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };



  const handleChange2 = (event) => {
    setValue(event.target.value);
  };

  const [number, setNumber] = React.useState('');

  const handleChange3 = (event) => {
    setNumber(event.target.value);
  };

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
              Top Up Wallet
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent
          sx={{
            padding: '30px',
          }}
        >
          {/* <form method="post"> */}
                <Grid xs={12} lg={4}>
                  <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                  <CustomTextField 
                    type="text"
                    // placeholder="Enter Phone Number"
                    name="email" 
                    id="email" 
                    variant="outlined" 
                    fullWidth 
                    required 
                    value={data && data.email ? data.email : "techcapacitybuilder@gmail.com"}
                    disabled
                    // onChange={e => setPhonenumber(e.target.value)} 
                    />
                </Grid>
                <Grid xs={12} lg={4}>
                  <CustomFormLabel htmlFor="email">Phone Number</CustomFormLabel>
                  <CustomTextField 
                    type="phone_number"
                    // placeholder="Enter Phone Number"
                    name="email" 
                    id="email" 
                    variant="outlined" 
                    fullWidth 
                    required 
                    value={data && data.phone_number ? data.phone_number : "09025015566"}
                    disabled
                    // onChange={e => setPhonenumber(e.target.value)} 
                    />
                </Grid>
                <Grid xs={12} lg={4}>
                  <CustomFormLabel htmlFor="password">Enter Amount</CustomFormLabel>
                  <CustomTextField
                    name="amount"
                    placeholder="Enter Amount"
                    id="amount"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                    sx={{
                      mb: 3,
                    }}
                  />
                </Grid>
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
                </Box>
                {/* <NextLink href="/"> */}
                <Grid xs={12} lg={12}>
                  {/* <Button
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
                    {isloading ? <MoonLoader color="#fff" loading={isloading} size={50} /> : 'Top Up' }
                  </Button> */}
                  <Grid xs={12} md={4} lg={4}>
                      <PaystackButton className={styles.paystack__button} {...componentProps} />
                  </Grid>
                </Grid>
                {/* </NextLink> */}
          {/* </form> */}
        </CardContent>
        { errorResponse && <ErrorToaster title={ errorResponse } /> }
        { response && <SuccessToaster title={ response } /> }
      </Card>
    </div>
  );
};

export default FbDefaultForm;
