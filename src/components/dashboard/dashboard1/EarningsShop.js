import React from 'react';
import Image from 'next/image';
import FeatherIcon from 'feather-icons-react';
import { Card, CardContent, Typography, Box, Fab, Button } from '@mui/material';
import imgsvg from '../../../../assets/images/backgrounds/welcome-bg-2x-svg.svg';

const EarningsShop = ({ title, color, logo, clickAction }) => (
  <Card
    elevation={0}
    sx={{
      position: 'relative',
      backgroundColor: `${color}`,
      '&:before': {
        content: `""`,
        position: 'absolute',
        left: (theme) => `${theme.direction === 'rtl' ? 'unset' : '0'}`,
        right: (theme) => `${theme.direction === 'rtl' ? '0' : 'unset'}`,
        width: '100%',
        height: '100%',
        background: `url(${imgsvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transform: (theme) => `${theme.direction === 'rtl' ? 'scaleX(-1)' : 'unset'}`,
        backgroundPosition: (theme) =>
          `${theme.direction === 'rtl' ? 'right 19px center' : 'left 70px center'}`,
      },

      borderWidth: '0px',
    }}
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
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <Fab
            elevation="0"
            color="secondary"
            aria-label="dollar"
            sx={{
              color: '#fff',
              width: '90px',
              height: '90px',
            }}
          >
            <Image src={logo} width="60" height="60" alt="logo" />
            {/* <FeatherIcon icon="dollar-sign" width="24" height="24" /> */}
          </Fab>
        </Box>
      </Box>
      <Button
        sx={{
          marginTop: '15px',
          backgroundColor: '#000'
        }}
        variant="contained"
      >
        Click Here
      </Button>
    </CardContent>
  </Card>
);

export default EarningsShop;