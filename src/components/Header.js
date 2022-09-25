import "../styles/Header.css";

import logo_icon from "../assets/images/logo2.png"

const Header = () => {
  return (
    <div className="header">
    <span className="logo">
        <img src={logo_icon} alt="NoImage"/>
    </span>
      {/* title part */}
       <span className="header-title">Expense Tracker</span>
       <span className="header-text">Helps you in analyzing your expenses in most effective way</span>
    </div>
  )
}

export default Header