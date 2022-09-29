import React from "react";
import {
  Card,
  Grid,
  Typography,
  Chip,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import NextLink from "next/link";

const pricing = [
  {
    id: 1,
    badge: "none",
    package: "Buy Airtime",
    member: "3 Members",
    device: "Single Device",
    storage: "Free 100 on First",
    bkp: "X2 Your Recharge",
    btnsize: "large",
    btncolor: "secondary",
    btntext: "Airtime",
    btnlink: "/dashboards/purchase/airtime"
  },
  {
    id: 2,
    badge: "flex",
    package: "Buy Data",
    member: "5 Members",
    device: "Single Device",
    storage: "50MB Free on First",
    bkp: "Double Data",
    btnsize: "large",
    btncolor: "primary",
    btntext: "Data",
    btnlink: "/dashboards/purchase/data"
  }
];

const Pricing = () => {
  return (
    <Grid container>
      <Grid item xs={12} lg={12} sm={12}>
        <Typography variant="h4" textAlign="center">
            What Service Do You Want?              
        </Typography>
      </Grid>
      {pricing.map((price) => (
        <Grid item xs={12} lg={6} sm={6} key={price.id}>
          <Card
            sx={{
              textAlign: "center",
              overflow: "unset",
              position: "relative",
            }}
          >
            <NextLink href={price.btnlink}>
              <Button
                variant="contained"
                size={price.btnsize}
                color={price.btncolor}
                sx={{ width: "100%", mt: 4 }}
              >
                {price.btntext}
              </Button>
            </NextLink>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Pricing;
