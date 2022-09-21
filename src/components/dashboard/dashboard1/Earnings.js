import React from "react";
import FeatherIcon from "feather-icons-react";
import { Card, CardContent, Typography, Box, Fab, Button } from "@mui/material";
import NextLink from "next/link";

const Earnings = ({ data }) => (
  <Card
    sx={{
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: "white",
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Typography
          variant="h3"
          sx={{
            marginBottom: "0",
          }}
          gutterBottom
        >
          Wallet
        </Typography>
        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
          <Fab
            size="medium"
            aria-label="add"
            color="default"
            elevation="0"
            sx={{
              boxShadow: "none",
            }}
          >
            <FeatherIcon icon="dollar-sign" />
          </Fab>
        </Box>
      </Box>
      <Typography
        variant="h1"
        fontWeight="500"
        sx={{
          marginBottom: "0",
          marginTop: "15px",
        }}
        gutterBottom
      >
        ₦{data && data.wallet_balance ? data.wallet_balance : " "}
      </Typography>
      <NextLink href="/dashboards/topup-wallet">
          <Button
            sx={{
              marginTop: '15px',
            }}
            variant="contained"
            color="primary"
          >
            Top Up Wallet
          </Button>
      </NextLink>
    </CardContent>
  </Card>
);

export default Earnings;
