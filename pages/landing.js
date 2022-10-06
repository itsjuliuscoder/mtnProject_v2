import * as React from "react";
import {useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import styles from "../styles/Component.module.css";
import FeatherIcon from 'feather-icons-react';
import NextLink from "next/link";
import { constant } from "../src/constants";
import {motion} from 'framer-motion';
import pkg from 'react';
const { useReducer, useRef, useLayoutEffect } = pkg;

export default function Landing() {
const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
}
const fadeRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
}
const fadeUp = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
}
  return (
    <>  
        <div  className={styles.banner_bg}>
            <Grid container spacing={0}>
                {/* ------------------------- row 1 ------------------------- */}
                <Grid item xs={12}  lg={12}>
                        <motion.h1
                            variants={fadeUp}
                            initial='hidden'
                            animate='visible'
                            transition={{ duration: 1.5 }}
                            style={{ fontSize: '48px', fontWeight: '900', textAlign: 'center' }}
                        >
                            Welcome to RIGHTNET
                        </motion.h1>
                        <motion.p
                            variants={fadeLeft}
                            initial='hidden'
                            animate='visible'
                            transition={{ duration: 2 }}
                            style={{ fontSize: '18px', fontWeight: '500', textAlign: 'center' }}
                        >
                            We offer services such as Data Bundle and Airtime TopUp, Bills Payments, Cable Subscription and lots more
                        </motion.p>                    
                </Grid>
            </Grid>
            <div className={styles.group__btn}>
                <Grid container spacing={2}>
                    <Grid item xs={12}  lg={6}>
                        <Typography variant="h5" fontWeight="900" textAlign="center">
                            <NextLink href="/authentication/login">
                                <motion.div
                                    variants={fadeLeft}
                                    initial='hidden'
                                    animate='visible'
                                    transition={{ duration: 2 }}
                                    style={{ fontSize: '18px', fontWeight: '500', textAlign: 'center' }}
                                ><Button className={styles.create__account__4}> Login To Continue </Button> 
                                </motion.div>
                            </NextLink>
                        </Typography>
                    </Grid> 
                    <Grid item xs={12}  lg={6}>
                        <Typography variant="h5" fontWeight="900" textAlign="center">
                            <NextLink href="/authentication/login">
                                <motion.div
                                    variants={fadeRight }
                                    initial='hidden'
                                    animate='visible'
                                    transition={{ duration: 2 }}
                                    style={{ fontSize: '18px', fontWeight: '500', textAlign: 'center' }}
                                >
                                    <Button className={styles.create__account__3}> Create An Account </Button> 
                                </motion.div>
                            </NextLink>
                        </Typography>
                    </Grid> 
                </Grid>
            </div>
        </div>
        <div className={styles.row__style__3}>
            <div className={styles.container__style}>
                <Typography variant="h1" fontWeight="900" textAlign="center" style={{ fontSize: '48px', marginBottom: '1em' }}>
                    Our Services
                </Typography>   
                <Grid container spacing={2}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={4}>
                        <div className={styles.never__runout_text__2}>
                            <Box textAlign="left">
                                <FeatherIcon icon="layers" width="50" height="50" />
                            </Box>
                            <Typography mt="2" variant="h4" fontWeight="900" textAlign="left">
                                Airtime TopUp
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <div className={styles.never__runout_text__2_2}>
                            <Box textAlign="left">
                                <FeatherIcon icon="database" width="50" height="50" />
                            </Box>
                            <Typography mt="2" variant="h4" fontWeight="900" textAlign="left">
                                Data Bundle Subscription
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <div className={styles.never__runout_text__2_3}>
                            <Box textAlign="left">
                                <FeatherIcon icon="cpu" width="50" height="50" />
                            </Box>
                            <Typography mt="2" variant="h4" fontWeight="900" textAlign="left">
                                Cable Subscription
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={4}>
                        <div className={styles.never__runout_text__2_5}>
                            <Box textAlign="left">
                                <FeatherIcon icon="move" width="50" height="50" />
                            </Box>
                            <Typography mt="2" variant="h4" fontWeight="900" textAlign="left">
                                Airtime To Cash
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <div className={styles.never__runout_text__2_4}>
                            <Box textAlign="left">
                                <FeatherIcon icon="layers" width="50" height="50" />
                            </Box>
                            <Typography mt="2" variant="h4" fontWeight="900" textAlign="left">
                                Utility Bills Payments
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <div className={styles.never__runout_text__2_7}>
                            <Box textAlign="left">
                                <FeatherIcon icon="layers" width="50" height="50" />
                            </Box>
                            <Typography mt="2" variant="h4" fontWeight="900" textAlign="left">
                                Borrow Airtime
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        <div className={styles.row__style__2}>
            <div className={styles.container__style}>
                <Grid container spacing={2}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={4}>
                        <Typography mt="2" variant="h1" fontWeight="900" textAlign="left" style={{ fontSize: '42px' }}>
                            Secured E-Wallet Platform
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6} style={{ textAlign: "center" }}>
                                {/* <div className={styles.never__runout_text__3}> */}
                                    <Box textAlign="center" style={{ backgroundColor: '#fff', color: '#000', width: '30%', margin: '1em auto', borderRadius: '22px', padding: '9px' }}>
                                        <FeatherIcon icon="key" width="70" height="70" />
                                    </Box>
                                    <Typography mt="2" variant="p" fontWeight="500" textAlign="center" style={{ margin: '1em auto' }}>
                                        We adopt advance algorithm which helps us in verifying our users and their credit worthiness before they can be offering/requesting for loan
                                    </Typography>
                                {/* </div> */}
                            </Grid>
                            <Grid item xs={12} lg={6} style={{ textAlign: "center" }}>
                                {/* <div className={styles.never__runout_text__3}> */}
                                    <Box textAlign="center" style={{ backgroundColor: '#fff', color: '#000', width: '30%', margin: '1em auto', borderRadius: '22px', padding: '9px' }}>
                                        <FeatherIcon icon="lock" width="70" height="70" />
                                    </Box>
                                    <Typography mt="2" variant="p" fontWeight="500" textAlign="center" style={{ textAlign: "center" }}>
                                            RightNet places top priority on security and we adopt top level Internet Security which enable us encrypt information and it is completely protected from fraud.
                                    </Typography>
                                {/* </div> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
        {/* <div className={styles.row__style}>
            <div className={styles.container__style}>   
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <div className={styles.never__runout}></div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <div className={styles.never__runout_text}>
                            <Typography mt="2" variant="h2" fontWeight="900">
                                Never Run Out of Airtime & Data
                            </Typography>
                            <Typography mt="2" variant="p">
                                With RightNet, you should never run out airtime and data, with out quick access to our borrow airtime and data service.
                            </Typography>
                            <div>
                                <NextLink href="/authentication/register">
                                    <Button className={styles.create__account__2}> Get Started Now! </Button>
                                </NextLink>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div> */}
        <div className={styles.row__steps}>
            <div className={styles.container__style}>   
                <Grid container spacing={2}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={6}>
                        <Grid item xs={12} lg={12}>
                            <div className={styles.step_one}>
                                <Typography variant="h3" fontWeight="900" textAlign="left" style={{ marginTop: '4em', fontSize: '32px' }}>
                                    Register to Get Started
                                </Typography>
                                <p>To use RightNet services, you need to first register as a user.</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <div className={styles.step_two}>
                                <Typography variant="h3" fontWeight="900" textAlign="left" style={{ marginTop: '4em', fontSize: '32px' }}>
                                    Login to the E-Wallet Dashboard 
                                </Typography>
                                <p>After successfully registering, you are required to login to enable you access the wide range of services RightNet offers</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <div className={styles.step_three}>
                                <Typography variant="h3" fontWeight="900" textAlign="left" style={{ marginTop: '4em', fontSize: '32px' }}>
                                    TopUp E-Wallet
                                </Typography>
                                <p>After successfully registering, you are required to login to enable you access the wide range of services RightNet offers</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <div className={styles.step_four}>
                                <Typography variant="h3" fontWeight="900" textAlign="left" style={{ marginTop: '4em', fontSize: '32px' }}>
                                    Buy Airtime, Data 
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <div style={{ margin: '15em auto' }}>
                            <Typography mt="2" variant="h2" fontWeight="900">
                                Create A RightNet Account Now
                            </Typography>
                            {/* <Typography mt="2" variant="p">
                                With RightNet, you should never run out airtime and data, witsh out quick access to our borrow airtime and data service.
                            </Typography> */}
                            <div>
                                <NextLink href="/authentication/register">
                                    <Button className={styles.create__account__2}> Get Started Now! </Button>
                                </NextLink>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        <div className={styles.getting__started}>
            <div className={styles.container__style}>   
                <Grid container spacing={2}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={8}>
                        <div className={styles.top2}>
                            <Typography  variant="h5">
                                Get Started Now!
                            </Typography>
                            <Typography mt="2" variant="h1" fontWeight="900">
                                Get Started In Minutes
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <div className={styles.top2}>
                            <NextLink href="/authentication/register">
                                <Button className={styles.create__account}> Create An Account </Button> 
                            </NextLink>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        <div className={styles.footer__row}>
            <div className={styles.container__style}>
                <Grid container spacing={2}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={4}>
                        <Typography mt="2" variant="h1" fontWeight="900">
                            RightNet
                        </Typography>
                        <Typography mt="2" variant="h6" fontWeight="900">
                            hello@rightnet.com.ng
                        </Typography>
                        <Typography mt="2" variant="h6" fontWeight="900">
                            +234 9025015566
                        </Typography>
                        <ul className={styles.row__line}>
                            <li><FeatherIcon icon="facebook" width="24" height="24" /></li>
                            <li><FeatherIcon icon="twitter" width="24" height="24" /></li>
                            <li><FeatherIcon icon="instagram" width="24" height="24" /></li>
                        </ul>
                        

                    </Grid>
                    <Grid item xs={12} lg={8}>
                        
                    </Grid>
                </Grid>
            </div>
        </div>
    </>
  );
}
