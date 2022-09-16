import { Grid } from '@mui/material';
import React, { useState } from "react";
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
    EarningsShop
  } from '../../src/components/dashboard/dashboard1';

const Dashboard1 = () => {
  const [open, setOpen] = useState(false);
  const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
  ));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6}>
        <Earnings />
      </Grid>
      <Grid item xs={12} lg={6}>
        <WelcomeCard />
        <Grid container spacing={0}>
          <Grid item xs={12} lg={6} sm={6}>
            <Earnings />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <MonthlySales />
          </Grid>
        </Grid>
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={3}>
        <EarningsShop title="MTN" logo={mtn} clickAction={handleClickOpen} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="GLO" logo={glo} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="AIRTEL" logo={airtel} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="9MOBILE" logo={mobile} />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={3}>
        <EarningsShop title="DSTV/GOTV" logo={utility} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="UTILITY BILLS" logo={utility} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="TRANSFER" logo={utility} />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="BORROW AIRTIME & LOAN" logo={utility} />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={3}>
        <TotalSales />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ProductPerformance />
      </Grid>
      <Grid item xs={12} lg={3}>
        <TotalSales />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={12}>
        <MedicalProBranding />
      </Grid>      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h4">
          Compose Mail
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            component="div"
          >
            <h2> Welcome here! </h2>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Send
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>    
  );
};

export default Dashboard1;
