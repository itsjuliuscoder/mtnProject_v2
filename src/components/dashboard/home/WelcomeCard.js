import React from "react";
import Image from "next/image";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import NextLink from "next/link";
import imgsvg1 from "../../../../assets/images/backgrounds/welcome-bg2-2x-svg.svg";
import imgsvg from "../../../../assets/images/backgrounds/people.png";
import ErrorToaster from "../../../components/dashboard/home/ErrorToaster";

const WelcomeCard = ({ data, time, clickAction }) => (
  <Card
    elevation={0}
    sx={{
      position: "relative",
    }}
  >
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

      { data.isPin ?     
        <Button
            sx={{
              marginTop: "15px",
            }}
            variant="contained"
            color="primary"
            onClick={clickAction}
          >
            Buy Airtime & Data Now!
        </Button>
      : 
      <NextLink href="/dashboards/set-pin">
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
