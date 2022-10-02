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
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CheckIcon from '@mui/icons-material/Check';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
const Transactions = () => {
    // model for add expense
    const [isOpen, setisOpen] = useState(false);
    //modal for delete expense
    const [isOpenDelete, setisOpenDelete] = useState(false);
    //model for update expense
    const [isOpenUpdate, setisOpenUpdate] = useState(false);

    //this data is used for deipay purpose
    const categories = ["Savings", "House Rent", "Grocerys and Food","Electronics" ,"Entertaiment", "EMI'S", "Credit Card Bill's"]
    //this data is used for working on the core logic part
    const category_keys = ["savings", "house_rent", "grocery_food", "electronics", "entertainment", "emis", "credit_card_bills"]
    const [salary, setSalary] = useState('')
    const [display_salary,setDisplaySalary] = useState({salary:0})
    const [expense_type, setExpenseType] = useState('');
    const [amount, setAmount] = useState('');
    const expense_display_object={"savings":"Savings","house_rent":"House Rent","grocery_food":"Grocerys and Food","electronics":"Electronics","entertainment":"Entertaiment","emis":"EMI'S","credit_card_bills":"Credit Card Bill's"}
    const [series_data, setSeriesData] = useState([{ name: "percentage", data: [13.7, 16.3, 8.3, 3.3, 1.6, 0,0] }])
    let [expense_dropdown, setExpenseDropdown] = useState([{ expense_type: "savings", display_name: "Savings",hidden:false }, {expense_type: "house_rent",display_name:"House Rent",hidden:false}, {expense_type: "grocery_food",display_name:"Grocerys and Food",hidden:false}, {expense_type: "electronics",display_name:"Electronics",hidden:false}, { expense_type: "entertainment",display_name:"Entertaiment",hidden:false}, {expense_type: "emis",display_name:"EMI'S",hidden:false}, {expense_type: "credit_card_bills",display_name:"Credit Card Bill's",hidden:false}])
    // buffer data which data which is newly getting added to check whether user is closing form with out submitting his expense data
    function createData(expense_type, amount) {
        let expense_display_name = expense_display_object[expense_type]
        return { expense_display_name, expense_type, amount };
    }
    let [expense_buffer_data, setExpenseBuffer] = useState([])
    let [expense_data, setExpenseData] = useStateWithCallbackLazy([])

    const [updateExpenseData, setUpdateExpenseData] = useStateWithCallbackLazy({
        expense_pos:-1,
        expense_type: "",
        amount: 0
    })

    const[deleteExpensePos,setDeleteExpensePos] = useState(-1)
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

    const updateExpense = (pos,expense_type, expense_amount) => {
        console.log("value of pos",pos)
        setUpdateExpenseData({expense_pos:pos ,expense_type:expense_type, amount: expense_amount }, () => {
            console.log("data of update expense",updateExpenseData)
            setisOpenUpdate(true)
        })
    }

    const deleteExpenseData = () => {
        let data =expense_data;
        data.splice(deleteExpensePos,1);
        setExpenseData(data);
        setisOpenDelete(false);
    }
    
      const expense_caluclate_analysis = () => {
        console.log("value of salary",salary)
        setDisplaySalary({salary})
        setisOpen(false)
        console.log("value of expense",expense_type)
        console.log("value of amount",amount)
        console.log("value of caluclation",salary%amount)
        // let find_expense = data.findIndex(ele => ele["org_name"] == expense_type)
        // if(find_expense != -1){
        //     data[find_expense]["percentage"] = Number(((amount/salary)*100).toFixed(0));
        // }
        // console.log("data of expense caluclation",data)
      }
      const expenseTableData = () => {
        //setting table data
        setExpenseData(expense_data.concat([createData(expense_type,amount)]))
        //setting buffer data so that if user closes the form before subbmitting the new transactions data we won't be adding that data for expense computation
        setExpenseBuffer(expense_buffer_data.concat([createData(expense_type,amount)]))
        // setExpenseDropdown
        let data = expense_dropdown;
        let find_expense_pos = data.findIndex((ele) => ele["expense_type"] === expense_type);
        data[find_expense_pos]["hidden"]=true;
        setExpenseDropdown(data);
        setExpenseType('')
        setAmount('')
      }
      const updateExpenseAmount = () => {
        let data = expense_data;
        console.log("data of updated expense",updateExpenseData)
        //here we direclty updating amount at updated expense
        data[updateExpenseData["expense_pos"]]["amount"] = updateExpenseData["amount"]
        setExpenseData(expense_data,() => {
            console.log("data of expesnes",expense_data)
        })
        setisOpenUpdate(false)
      }
    return (
        <>
            <div className='main_header'>
                <div className='analysis_chart'>
                    <div className='expense_chart'>
                        <p className='chart_header'>Overall Expense Analysis</p>
                        {display_salary['salary'] > 0 ? <p className='salary_info'>Salary :{display_salary['salary']}</p> : ''}
                        <Chart
                            options={chart_options}
                            series={series_data}
                            type="bar"
                            width="1050"
                        />
                        <Button variant="contained" style={{ marginBottom: "15px" }}
                            onClick={() => {
                                setisOpen(true)
                            }}>Add Expense Data</Button>
                        {/* <Button color="success" onClick={() => addData(series_data)}>Add data</Button> */}
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} backdrop="static" size="xl" scrollable={true}>
                <ModalHeader  toggle={() => {
                    setisOpen(false)
                }}>
                    <span>Add Expense</span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Box style={{ paddingTop: "15px" }}
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '35ch' },
                            }}
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" label="Enter Your Salary" type='number' variant="outlined" value={salary}
                                onChange={(event) => {
                                    setSalary(event.target.value)
                                }} />
                        </Box>
                    </Row>
                    <Row md={12}>
                        <Col md={5}>
                            <FormControl variant="filled" sx={{ '& > :not(style)': { m: 1, width: '45ch' }, }}>
                                <InputLabel id="demo-simple-select-filled-label">Select Expense Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={expense_type}
                                    onChange={(event) => {
                                        setExpenseType(event.target.value)
                                    }}
                                >
                                    {expense_dropdown.map((exp) => {

                                        return <MenuItem hidden={exp.hidden} key={exp.expense_type} value={exp.expense_type}>{exp.display_name}</MenuItem>
                                    })}
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
                                <TextField id="outlined-basic" label="Enter Amount" variant="outlined" value={amount} type='number'
                                    onChange={(event) => {
                                        setAmount(event.target.value)
                                    }} />
                            </Box>
                        </Col>
                        <Col md={2}>
                            <Button endIcon={<AddCircleOutlineSharpIcon />} variant='contained' color="info"
                            onClick={expenseTableData}>Add Expense</Button>
                        </Col>
                    </Row>
                    {expense_data.length > 0 ? (
                        <Row>
                            <div style={{ textDecoration: "underline" }}>Expense Data</div>
                            <TableContainer component={Paper}>
                                <Table sx={{ width: 1100 }} aria-label="bordered table">
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
                                        {expense_data.map((row,index) => (
                                            <TableRow
                                                key={row.expense_type}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.expense_display_name}
                                                </TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell><EditRoundedIcon style={{ color: "orange",cursor:"pointer" }} onClick={() => {
                                                    updateExpense(index,row.expense_display_name, row.amount)
                                                }} /></TableCell>
                                                <TableCell><DeleteIcon style={{ color: "red",cursor:"pointer" }}
                                                    onClick={() => {
                                                        setisOpenDelete(true);
                                                        setDeleteExpensePos(index);
                                                    }}
                                                /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Row>
                    ) : (
                        <></>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col>
                            <Button endIcon={<CancelRoundedIcon />} variant="contained" color="error" onClick={() => {
                                setisOpen(false)
                                setSalary('')
                            }}>
                                Close
                            </Button>
                        </Col>
                        <Col>
                            <Button endIcon={<SendIcon />} variant="contained" color="success" 
                            onClick={expense_caluclate_analysis}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isOpenDelete} backdrop="static" size="md" scrollable={true}>
                <ModalHeader>
                    <span>Delete Expense</span>
                </ModalHeader>
                <ModalBody>
                    <div style={{ fontSize: "20px" }}>Are you sure to delete your expense?</div>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col>
                            <Button endIcon={<CancelRoundedIcon />} variant="contained" color="error" onClick={() => {
                                setisOpenDelete(false)
                            }}>
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button endIcon={<CheckIcon />} variant="contained" color="success" 
                            onClick={deleteExpenseData}>
                                Confirm
                            </Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
            <Modal isOpen={isOpenUpdate} backdrop="static" size="lg" scrollable={true}>
                <ModalHeader>
                    <span>Update Expense</span>
                </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Expense Type" variant="outlined" value={updateExpenseData['expense_type']}
                                    disabled />
                            </Box>
                        </Col>
                        <Col>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Enter Amount" variant="outlined" value={updateExpenseData['amount']} type='number'
                                    onChange={(event) => {
                                        setUpdateExpenseData({ expense_pos:updateExpenseData["expense_pos"],expense_type: updateExpenseData['expense_type'], amount: event.target.value })
                                    }} />
                            </Box>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col>
                            <Button endIcon={<CancelRoundedIcon />} variant="contained" color="error" onClick={() => {
                                setisOpenUpdate(false)
                            }}>
                                Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button endIcon={<CheckIcon />} variant="contained" color="success" onClick={updateExpenseAmount}>
                                Confirm
                            </Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </>
    );
};




export default Transactions;
