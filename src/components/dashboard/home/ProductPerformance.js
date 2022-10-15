import React, {useState, useEffect} from 'react';
import Image from "next/image";
import { DataGrid } from '@mui/x-data-grid';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Card,
  CardContent,
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    // { field: 'reference_id', headerName: 'Reference ID', width: 130 },
    { 
      field: 'createdAt',
      headerName: 'Transaction Date',
      width: 250,
      // valueGetter: (transactionData) =>
      //   `${moment(transactionData.createdAt).format("yyyy-M-D") || ''}`,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 130,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 600,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (transactionData) =>
    //     `${moment(transactionData.createdAt).format("yyyy-M-D") || ''}`,
    // },
  ];
  
  const transactionD = transactionData.map(({ reference_id: id, createdAt, amount, description, }) => ({ id, createdAt, amount, description }));

  console.log("this is the formatted transaction data --->", transactionD);

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <Card>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={transactionD}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
    </Card>
  );  
}
export default ProductPerformance;
