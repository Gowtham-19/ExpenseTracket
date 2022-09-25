import React from 'react'
import Header from './components/Header';
import Transactions from './components/Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ApexChart from './components/ApexChart';
const  App = () => {
  return (
    <div>
      <Header/>
      <Transactions/>
      {/* <ApexChart/> */}
    </div>
  )
}

export default App