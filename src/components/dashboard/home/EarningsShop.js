import React from 'react';
import Image from 'next/image';
import FeatherIcon from 'feather-icons-react';
import { Card, CardContent, Typography, Box, Fab, Button } from '@mui/material';
import imgsvg from '../../../../assets/images/backgrounds/welcome-bg-2x-svg.svg';
import NextLink from "next/link";

const EarningsShop = ({ title, color, logo, link }) => (
  <Card
    elevation={0}
  >
    <CardContent>
      <Box display="flex" alignItems="center">
        <Box>
          <Typography
            fontWeight="700"
            variant="h4" 
            color="textSecondary"            
          >
            
          </Typography>
          <Typography
            variant="h3"            
          >
            {title}
          </Typography>
        </Box>
        {/* <Box
          sx={{
            ml: 'auto',
          }}
        > */}
          {/* <Fab
            elevation="0"
            aria-label="dollar"
            sx={{
              color: '#fff',
              width: '90px',
              height: '90px',
            }}
          > */}
            <Image src={logo} width="60" height="60" alt="logo" />
            {/* <FeatherIcon icon="dollar-sign" width="24" height="24" /> */}
          {/* </Fab> */}
        {/* </Box> */}
      </Box>
      {
        link === "airtime" ? <NextLink href="/dashboards/purchase/airtime">
        <Button
          sx={{
            marginTop: '15px',
            backgroundColor: '#000'
          }}
          variant="contained"
        >
        Click Here
      </Button>
        </NextLink> : 
      
      <NextLink href="/dashboards/purchase/data">
        <Button
          sx={{
            marginTop: '15px',
            backgroundColor: '#000'
          }}
          variant="contained"
        >
        Click Here
      </Button>
        </NextLink>
      }
    </CardContent>
  </Card>
);

export default EarningsShop;