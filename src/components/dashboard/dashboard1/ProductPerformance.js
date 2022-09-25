import React, {useState, useEffect} from 'react';
import Image from "next/image";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from '@mui/material';
import ThemeSelect from './ThemeSelect';
import DashboardCard from '../../baseCard/DashboardCard';
import axios from "axios";

import img1 from '../../../../assets/images/users/1.jpg';
import img2 from '../../../../assets/images/users/2.jpg';
import img3 from '../../../../assets/images/users/3.jpg';
import img4 from '../../../../assets/images/users/4.jpg';
import img5 from '../../../../assets/images/users/5.jpg';
import moment from "moment";



const products = [
  {
    imgsrc: img1,
    name: 'Sunil Joshi',
    post: 'Web Designer',
    pname: 'Elite Admin',
    priority: 'Low',
    budget: '3.9',
  },
  {
    imgsrc: img2,
    name: 'Andrew McDownland',
    post: 'Project Manager',
    pname: 'Real Homes WP Theme',
    priority: 'Medium',
    budget: '24.5',
  },
  {
    imgsrc: img3,
    name: 'Christopher Jamil',
    post: 'Project Manager',
    pname: 'MedicalPro WP Theme',
    priority: 'High',
    budget: '12.8',
  },
  {
    imgsrc: img4,
    name: 'Nirav Joshi',
    post: 'Frontend Engineer',
    pname: 'Hosting Press HTML',
    priority: 'Critical',
    budget: '2.4',
  },
  {
    imgsrc: img5,
    name: 'Micheal Doe',
    post: 'Content Writer',
    pname: 'Helping Hands Theme',
    priority: 'Moderate',
    budget: '9.3',
  },
];

const ProductPerformance = ({ data }) => {

  const [open, setOpen] = useState(false);
  const [openPinModal, setPinModal] = useState(false);
  const [ isloading, setIsloading ] = useState(true);
  const [transactionData, setTransactionData] = useState([]);
  const [ response, setResponse ] = useState('');
  const [ errorResponse, setErrorResponse ] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("userToken");
    // setAccessToken(token);
    // setUserData(currentUser);
    retrieveTransactionHistory();
    // currentDate();
  }, []);


  const setEmptyAlert = () => {
    setResponse("");
    setErrorResponse("");
  }


  const retrieveTransactionHistory = () => {

    setIsloading(true);
    const headers = {
      Accept: "application/json",
      // Authorization: accessToken ? accessToken : "No Auth"
    }

    axios({
      method: 'post',
      url: 'https://mtn-backend-api-service.herokuapp.com/v1/auth/getTransaction',
      headers,
      data:{
        phone_number: data.phone_number,
        user_id: data._id
      }
    }).then(function(response){
        console.log("this is the response data -->", response.data);
        setIsloading(false);
        if(response.data.statusCode === "000"){
          // setUserResponseData(response.data.payload);
          setTransactionData(response.data.data);
        } else {
          console.log("this is the response gotten", response);
        }
    }).catch((error) => {
        setIsloading(false);
        console.log("this is the error response gotten", error);
        setErrorResponse("No Data for the User");
        setTimeout(setEmptyAlert, 5000);
    })
  };

  return (
    <DashboardCard
      title="Transaction History"
      subtitle="Ample Admin Vs Pixel Admin"
      customdisplay="block"
      custommargin="10px"
      action={<ThemeSelect />}
    >
      <Box
        sx={{
          overflow: 'auto',
          mt: -3,
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5">Reference ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Transaction Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Amount</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Description</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionData ? transactionData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {transaction.reference_id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {moment(transaction.createdAt).format("MMMM, DD YYYY HH:mm:ss")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                  ₦{transaction.amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{transaction.description}</Typography>
                </TableCell>
              </TableRow>
            )) : "No Transaction Data" }
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );  
}
export default ProductPerformance;
