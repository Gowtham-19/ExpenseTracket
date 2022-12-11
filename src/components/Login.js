import React from 'react'
import "../styles/Login.css"

const login = () => {
  return (
    <div className='login_page'>
        <div className='page_left'>
          <div className='main_header'> Expense Tracker</div>
         
        </div>
        <div  className='page_right'>
          <div className='login_form'>
        <div className='login_header'>Login Page</div>
          <label>User Name</label>
          <input className='form-control' type="text"/>
          <label>Password</label>
          <input  className='form-control' type="password" />
        </div>
          </div>
    </div>
  )
}

export default login