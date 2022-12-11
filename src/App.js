import React from 'react'
import Header from './components/Header';
import Transactions from './components/Transactions';
import Login from './components/Login';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import ApexChart from './components/ApexChart';
const  App = () => {
  return (
    <div>
     <Header/>
     <Transactions/>
      {/* <Login/> */}
    </div>
  )
}

export default App