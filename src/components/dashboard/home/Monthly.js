import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import FeatherIcon from "feather-icons-react";
import { Card, CardContent, Typography, Box, Fab } from "@mui/material";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Monthly = ({ referral }) => {

  // console.log("this is the referral count -->", referral);
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const optionsmonthlychart = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    colors: [primary],
    chart: {
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriesmonthlychart = [
    {
      name: "Monthly Sales",
      data: [35, 60, 30, 55, 40],
    },
  ];
  return (
    <Card
      sx={{
        pb: 0,
        pl: 0,
        pr: 0,
      }}
    >
      <CardContent
        sx={{
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <Box display="flex" alignItems="flex-start">
          <Box>
            <Typography
              variant="h3"
              color="textSecondary"
              sx={{
                marginBottom: "0",
              }}
              gutterBottom
            >
              Total Referrals
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: "1px",
                mb: "0px",
              }}
              gutterBottom
            >
              {referral}
            </Typography>
            <Typography
                variant="h4"
                sx={{
                  mt: "12px",
                  mb: "0px",
                }}
            >
            </Typography>
          </Box>

         
        </Box>
      </CardContent>
    </Card>
  );
};

export default Monthly;
