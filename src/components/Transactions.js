/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "../styles/Transaction.css";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Modal, ModalFooter, ModalHeader, ModalBody, Row, Col, Input } from "reactstrap"
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Chart from "react-apexcharts";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
const Transactions = () => {
    const [isOpen, setisOpen] = useState(false);

    const handleClose = () => setisOpen(false);
    const handleShow = () => setisOpen(true);

    const categories = ["Savings", "House Rent", "Grocerys and Food", "Electronics", "Entertaiment", "EMI'S", "Credit Card Bill's"]
    const [salary, setSalary] = useState()
    const [expense_type, setExpenseType] = useState('');
    const [amount, setAmount] = useState('');
    const [series_data, setSeriesData] = useState([{ name: "percentage", data: [13.7, 16.3, 8.3, 3.3, 1.6, 0, 0] }])
    let table_data=[]
    function createData(expense_type, amount) {
        return { expense_type, amount };
      }      
    const rows = [
  createData('Savings', 8000),
  createData('House Renth', 10000),
  createData('Grocerys and Food', 5000),
  createData('Electronics',2000 ),
  createData('Entertaiment', 1000),
];
    const chart_options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: categories,
            position: "top",
            labels: {
                style: {
                    fontSize: '15px'
                }
            }
        },
        legend: {
            show: true,
            fontSize: "20px"
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 4,
        },
        colors: ["#000", "#6acc90", "#9da7d4", "#c27959", "#ffa500", "#800080", "#cc0066"],
        plotOptions: {
            bar: {
                columnWidth: '45%',
                borderRadius: 20,
                distributed: true,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        tooltip: {
            enabled: false
        },
        hover: {
            filter: {
                type: 'none',
            }
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        },
        exporting: {
            enabled: false
        }
    }

    const addData = (trans_data) => {
        console.log("data of trans", trans_data)
        let porcess_data = trans_data[0]["data"]
        for (let i = 0; i < porcess_data.length; i++) {
            if (i === 2) {
                porcess_data[i] = 20;
            } else if (i === 1) {
                porcess_data[i] = 30;
            }
        }
        setSeriesData([{ data: porcess_data }])
    }
    //   const expense_caluclate_analysis = () => {
    //     console.log("value of salary",salary)
    //     console.log("value of expense",expense_type)
    //     console.log("value of amount",amount)
    //     console.log("value of caluclation",salary%amount)
    //     let find_expense = data.findIndex(ele => ele["org_name"] == expense_type)
    //     if(find_expense != -1){
    //         data[find_expense]["percentage"] = Number(((amount/salary)*100).toFixed(0));
    //     }
    //     console.log("data of expense caluclation",data)
    //   }

    return (
        <>
            <div className='main_header'>
                <div className='analysis_chart'>
                    <div className='expense_chart'>
                        <p className='chart_header'>Overall Expense Analysis</p>
                        {salary > 0 ? <p className='salary_info'>Salary :{salary}</p> : ''}
                        <Chart
                            options={chart_options}
                            series={series_data}
                            type="bar"
                            width="950"
                        />
                        <Button variant="contained" style={{ marginBottom: "15px" }}
                            onClick={() => {
                                setisOpen(true)
                            }}>Add Expense Data</Button>
                        {/* <Button color="success" onClick={() => addData(series_data)}>Add data</Button> */}
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} backdrop="static"  size="xl"  scrollable={true}>
                <ModalHeader>
                    <span>Add Expense</span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                    <Box style={{paddingTop:"15px"}}
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '35ch' },
                    }}
                    autoComplete="off"
                    >
                    <TextField id="outlined-basic" label="Enter Your Salary" type='number' variant="outlined" value={salary} 
                        onChange={(event)=> {
                            setSalary(event.target.value)
                            }}/>
                    </Box>
                    </Row>
                    <Row md={12}>
                        <Col md={5}>
                        <FormControl variant="filled" sx={{'& > :not(style)': { m: 1, width: '45ch' }, }}>
                        <InputLabel id="demo-simple-select-filled-label">Select Expense Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={expense_type}
                            onChange={(event)=> {
                                setExpenseType(event.target.value)
                            }}
                        >
                            <MenuItem value="savings">Savings</MenuItem>
                            <MenuItem value="house_rent">House Rent</MenuItem>
                            <MenuItem value="grocerys_food">Grocerys and Food</MenuItem>
                            <MenuItem value="electronics">Electronics</MenuItem>
                            <MenuItem value="entertainment">Entertaiment</MenuItem>
                            <MenuItem value="emis">EMI'S</MenuItem>
                            <MenuItem value="credit_card_bills">Credit Card Bill's</MenuItem>
                        </Select>

                    </FormControl>
                        </Col>
                        <Col md={5}>
                        <Box 
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '45ch' },
                    }}
                    autoComplete="off"
                    >
                    <TextField id="outlined-basic" label="Enter Amount" variant="outlined" value={amount}  type='number'
                        onChange={(event)=> {
                            setAmount(event.target.value)
                            }}/>
                    </Box>
                        </Col>
                        <Col md={2}>
                            <Button endIcon={<AddCircleOutlineSharpIcon/>} variant='contained' color="info">Add Expense</Button>
                        </Col>
                    </Row>
                    <Row>
                        <div style={{textDecoration:"underline"}}>Expense Data</div>
                        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>
            Expense Type
                </b></TableCell>
            <TableCell>
                <b>
                Amount&nbsp;(Rs)
                </b>
                </TableCell>
            <TableCell>
                <b>
                Update
                </b>
                </TableCell>
            <TableCell>
                <b>
                Delete
                </b>
                </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.expense_type}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.expense_type}
              </TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell><EditRoundedIcon  style={{color:"orange"}} /></TableCell>
              <TableCell><DeleteIcon style={{color:"red"}}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col>
                            <Button endIcon={<CancelRoundedIcon/>} variant="contained" color="error" onClick={() => {
                                setisOpen(false)
                            }}>
                                Close
                            </Button>
                        </Col>
                        <Col>
                            <Button endIcon={<SendIcon />} variant="contained" color="success" >
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </>
    );
};




export default Transactions;
