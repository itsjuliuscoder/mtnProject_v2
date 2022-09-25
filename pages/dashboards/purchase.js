import React, { useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  Typography,
  FormControlLabel,
  MenuItem
} from "@mui/material";

import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import CustomCheckbox from "../../src/components/forms/custom-elements/CustomCheckbox";
import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";
import CustomSelect from "../../src/components/forms/custom-elements/CustomSelect";
import styles from "../../styles/Component.module.css";

const steps = ["Account", "Transaction PIN", "Finish"];

const FormWizard = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [amount, setAmount] = React.useState("");
  const [phone, setPhonenumber] = React.useState("");
  const [amountTP, setAmountTP] = React.useState(0);
  const [userData, setUserData] = React.useState("");
  const [skipped, setSkipped] = React.useState(new Set());
  const [paymentDesc, setPaymentDesc] = React.useState("");
  const [pin, setPin] = React.useState("");
  


  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    //const token = localStorage.getItem("userToken");
    // setAccessToken(token);
    setUserData(currentUser);
  }, []);

  const isStepOptional = (step) => step === 1;

  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const setTransactionAmount = (e) => {
    // console.log("this is the transaction amount", e);
    const amounttp = e * 0.03;
    const amounttpValue = (e - amounttp);
    // console.log("amounttpValue -->", amounttpValue);
    setAmount(e);
    userData.acctype === "Merchant" ? setAmountTP(amounttpValue)  : setAmountTP(e);
    setPaymentDesc("You are purchasing an airtime of " + e);
  }

  // eslint-disable-next-line consistent-return
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <CustomFormLabel htmlFor="Name">Select Type</CustomFormLabel>
            <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={acctype}
                // onChange={handleChange}
                fullWidth
                size="small"
                >
                <MenuItem value="VTU">VTU(Airtime & Data)</MenuItem>
                <MenuItem value="EPIN">EPIN</MenuItem>
            </CustomSelect>
            <CustomFormLabel htmlFor="Email">Select Payment Method</CustomFormLabel>
            <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={acctype}
                // onChange={handleChange}
                fullWidth
                size="small"
                >
                <MenuItem value="Wallet">Wallet</MenuItem>
                <MenuItem value="Bonus">Bonus</MenuItem>
                <MenuItem value="Card">Card</MenuItem>
            </CustomSelect>
            <CustomFormLabel htmlFor="Password">Network</CustomFormLabel>
            {/* <CustomTextField 
                type="number"
                placeholder="MTN"
                name="phone_number" 
                id="phone_number" 
                variant="outlined" 
                size="small"
                fullWidth 
                value="MTN"
                required
                disabled
                //value={phone_number}
                //onChange={e => setPhonenumber(e.target.value)} 
            /> */}
            <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="MTN"
                // onChange={handleChange}
                fullWidth
                size="small"
                >
                <MenuItem value="MTN">MTN</MenuItem>
                <MenuItem value="AIRTEL">AIRTEL</MenuItem>
                <MenuItem value="9MOBILE">9MOBILE</MenuItem>
                <MenuItem value="GLO">GLO</MenuItem>
            </CustomSelect>
            <CustomFormLabel htmlFor="Amount">Amount</CustomFormLabel>
            <CustomTextField
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
              onChange={e => setTransactionAmount(e.target.value)} 
              required
            />
            <CustomFormLabel htmlFor="Amount">Amount To Pay</CustomFormLabel>
            <CustomTextField
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              name="amount_tp"
              disabled
              value={amountTP ? amountTP : '0'}
              placeholder="599"
              sx={{ mb: 3 }}
            />
            <CustomFormLabel htmlFor="Password">Mobile Number</CustomFormLabel>
            {/* <CustomTextField
              maxLength="11"
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
            /> */}
            <input
              maxLength={11}
              type="text"
              id="phone_number"
              name="phone_number"
              className={styles.input__field}
              required
              value={phone ? phone : ""}
              onChange={e => setPhonenumber(e.target.value)} 
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <CustomFormLabel htmlFor="Address">Payment Description</CustomFormLabel>
            <CustomTextField
              id="Address"
              value={paymentDesc ? paymentDesc : "Your Payment Description" }
              name="paymentDesc"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              disabled
              sx={{ mt: 1, mb: 3 }}
            />
            {/* <CustomTextField
              id="pin"
              size="small"
              variant="outlined"
              maxLength="4"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
            /> */}
            <CustomFormLabel htmlFor="Fname">Enter Transaction PIN</CustomFormLabel>
            <input
              maxLength={4}
              type="text"
              id="pin"
              name="pin"
              className={styles.input__field}
              required
              value={pin ? pin : ""}
              onChange={e => setPin(e.target.value)}
              //value={firstName}
              //onChange={handleNameChange}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h2">Payment Details</Typography>
            <Typography variant="h4">Amount: {amount}</Typography>
            <Typography variant="h4">Amount To Pay: {amountTP}</Typography>
            <Typography variant="h4">Payment Description: {paymentDesc}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Thank you for using rightNet.
            </Typography>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Agree with terms?"
            />
          </Box>
        );
      default:
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Card>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Important</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Box
              sx={{
                m: 3,
                p: 2,
                backgroundColor: "primary.light",
                borderRadius: 1,
              }}
            >
              All steps completed - you&apos;re finished
            </Box>

            <Box display="flex" sx={{ flexDirection: "row", p: 3 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset} variant="contained" color="error">
                Reset
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box>{handleSteps(activeStep)}</Box>

            <Box display="flex" sx={{ flexDirection: "row", p: 3 }}>
              <Button
                color="inherit"
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}
              { phone && amount != " " ? <Button
                onClick={handleNext}
                variant="contained"
                // disabled={(steps === "One Time PIN") && (pin === "")}
                color={
                  activeStep === steps.length - 1 ? "success" : "secondary"
                }
              >
                {((activeStep === steps.length - 1) && (pin != "")) ? "Finish" : "Next"}
              </Button>  : ""}
          
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default FormWizard;
