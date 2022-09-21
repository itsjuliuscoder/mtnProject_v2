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

  const config = {
    reference: (new Date()).getTime().toString(),
    email: data && data.email ? data.email : "techcapacitybuilder@gmail.com",
    amount: amount ? amount : "100",
    publicKey: 'pk_test_cdbf19c426a4d163dd3e939e53edde7f831fd6b6',
  };

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const componentProps = {
    ...config,
    text: 'Paystack Button Implementation',
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
          <form>
          <Grid>
              <Grid item xs={12} md={6}>
                <CustomFormLabel
                  sx={{
                    mt: 0,
                  }}
                  htmlFor="default-value"
                >
                  Fullname
                </CustomFormLabel>
                <CustomTextField
                  id="default-value"
                  variant="outlined"
                  defaultValue={data && data.firstname ? (data.firstname + " " + data.lastname) : ""}
                  fullWidth
                  size="small"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="email-text">Email</CustomFormLabel>
                  <CustomTextField
                    id="email-text"
                    type="email"
                    variant="outlined"
                    defaultValue={data && data.email ? (data.email + " " + data.email) : "techcapacitybuilder@gmail.com"}
                    fullWidth
                    size="small"
                    disabled
                  />
              </Grid>
          </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor="default-outlined-password-input">Phone Number</CustomFormLabel>
              <CustomTextField
                id="default-outlined-password-input"
                type="number"
                variant="outlined"
                defaultValue={data && data.phone_number ? data.phone_number : "09025015566"}
                fullWidth
                size="small"
                disabled
              />
            </Grid>            
            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor="default-outlined-password-input">Enter Amount</CustomFormLabel>
              <CustomTextField
                name="amount"
                placeholder="Enter Amount"
                id="amount"
                type="number"
                variant="outlined"
                fullWidth
                size="small"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required

              />
            </Grid>
            <div>
              {/* <Button sx={{
                mt: 2,
              }} color="primary" variant="contained">
                Submit
              </Button> */}
              <PaystackButton className={styles.paystack__button} {...componentProps} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FbDefaultForm;
