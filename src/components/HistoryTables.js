import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, {  } from '@mui/material/TableCell';
import "../styles/History.css"
const HistoryTables = (expense_histor_data,salary_amount) => {
    let salary_amount1=70000
    salary_amount = salary_amount1;
    // const history_data = expense_histor_data && expense_histor_data.length>0?expense_histor_data:[]
    const history_data=[{expense_display_name:"Savings",amount:20000},{expense_display_name:"House Rent",amount:10000}]
    console.log("value of history data",history_data)
    const calculate_expense_percentage = (amount) => {
        let expense_percentage = (Number(amount)/Number(salary_amount)*100).toFixed(0)

        return String(expense_percentage)+"%";
    }
  return (
    <div className='container history_table'>
        <span className='header_history'>Monthly Transaction History</span>
        <div className='history'>
        <TableContainer component={Paper}>
                                <Table aria-label="bordered table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ fontSize: "20px",textAlign:"center" }}><b>
                                                Expense Type
                                            </b></TableCell>
                                            <TableCell style={{ fontSize: "20px",textAlign:"center" }}>
                                                <b>
                                                    Amount&nbsp;(Rs)
                                                </b>
                                            </TableCell>
                                            <TableCell style={{ fontSize: "20px",textAlign:"center" }}>
                                                <b>
                                                    Expense Percentage
                                                </b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {history_data.map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row" style={{ fontSize: "20px",textAlign:"center" }}>
                                                    {row.expense_display_name}
                                                </TableCell>
                                                <TableCell style={{ fontSize: "20px",textAlign:"center" }}>{Number(row.amount).toLocaleString()}</TableCell>
                                                <TableCell component="th" scope="row" style={{ fontSize: "20px",textAlign:"center" }}>
                                                    {calculate_expense_percentage(row.amount)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
        </div>
    </div>
  )
}

export default HistoryTables