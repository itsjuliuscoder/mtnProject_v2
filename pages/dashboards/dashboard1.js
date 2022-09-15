import { Grid } from '@mui/material';
import mtn from "../../assets/images/logos/mtn.png"
import mobile from "../../assets/images/logos/9mobile.png"
import airtel from "../../assets/images/logos/airtel.png"
import glo from "../../assets/images/logos/glo.png"
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
        <EarningsShop title="MTN" logo={mtn} />
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
        <EarningsShop title="DSTV/GOTV" />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="UTILITY BILLS" />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="TRANSFER" />
      </Grid>
      <Grid item xs={12} lg={3}>
        <EarningsShop title="BORROW AIRTIME & LOAN" />
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
    </Grid>
  );
};

export default Dashboard1;
