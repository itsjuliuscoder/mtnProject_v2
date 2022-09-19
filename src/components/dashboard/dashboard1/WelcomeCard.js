import React from "react";
import Image from "next/image";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import NextLink from "next/link";
import imgsvg from "../../../../assets/images/backgrounds/welcome-bg2-2x-svg.svg";
import ErrorToaster from "../../../components/dashboard/dashboard1/ErrorToaster";

const WelcomeCard = ({ data, time }) => (
  <Card
    elevation={0}
    sx={{
      position: "relative",
    }}
  >
    <Box className="bg-img-1">
      <Image src={imgsvg} alt="welcome-img" />
    </Box>

    <CardContent>
      <Typography
        sx={{
          marginTop: "8px",
          marginBottom: "0px",
          lineHeight: "35px",
          position: "relative",
          zIndex: 9,
        }}
        variant="h3"
        gutterBottom
      >
        {time ? time : 'Hey'} {data && data.firstname ? data.firstname : 'User'}, <br />
      </Typography>
      <Typography
            variant="h5"            
          >
            Welcome to <b>rightNet</b>, Buy Airtime & Data
          </Typography>
      { data.isPin ?
        <NextLink href="/dashboard/purchase">
          <Button
            sx={{
              marginTop: "15px",
            }}
            variant="contained"
            color="primary"
          >
            Buy Airtime & Data Now!
          </Button>
      </NextLink>
      : 
      <NextLink href="/dashboard/set-pin">
          <Button
            sx={{
              marginTop: "15px",
            }}
            variant="contained"
            color="primary"
          >
            Create Pin
          </Button>
      </NextLink>
      }
    </CardContent>
  </Card>
);

export default WelcomeCard;
