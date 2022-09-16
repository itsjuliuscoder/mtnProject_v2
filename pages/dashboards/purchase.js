import React from "react";
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

const steps = ["Account", "One Time PIN", "Finish"];

const FormWizard = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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

  // eslint-disable-next-line consistent-return
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <CustomFormLabel htmlFor="Name">Select Type VTU</CustomFormLabel>
            <CustomSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={acctype}
                // onChange={handleChange}
                fullWidth
                size="small"
                >
                <MenuItem value="Individual">Individual</MenuItem>
                <MenuItem value="Merchant">Merchant</MenuItem>
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
                <MenuItem value="Individual">Wallet</MenuItem>
                <MenuItem value="Merchant">Bonus</MenuItem>
                <MenuItem value="Merchant">Card</MenuItem>
            </CustomSelect>
            <CustomFormLabel htmlFor="Password">Network</CustomFormLabel>
            <CustomTextField 
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
            />
            <CustomFormLabel htmlFor="Password">Amount</CustomFormLabel>
            <CustomTextField
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
            />
            <CustomFormLabel htmlFor="Password">Amount To Pay</CustomFormLabel>
            <CustomTextField
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              disabled
              value="599"
              placeholder="599"
              sx={{ mb: 3 }}
            />
            <CustomFormLabel htmlFor="Password">Mobile Number</CustomFormLabel>
            <CustomTextField
              id="Name"
              type="number"
              size="small"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <CustomFormLabel htmlFor="Fname">Enter ONE TIME PIN</CustomFormLabel>
            <CustomTextField
              id="pin"
              size="small"
              variant="outlined"
              fullWidth
              sx={{ mt: 1, mb: 3 }}
            />
            <CustomFormLabel htmlFor="Address">Enter Payment Description</CustomFormLabel>
            <CustomTextField
              id="Address"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              disabled
              sx={{ mt: 1, mb: 3 }}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5">Terms and condition</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              You are about to make an airtime purchase, we do not refund the amount purchased after 24hours.
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
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button
                onClick={handleNext}
                variant="contained"
                color={
                  activeStep === steps.length - 1 ? "success" : "secondary"
                }
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default FormWizard;
