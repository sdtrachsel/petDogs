import React from "react";
import './Header.css'
import logo from '../../assets/dog1.png'
import treats from '../../assets/dog-treat.png'


const Header = () => {
  return (
    <header>
      <img className="logo" src={logo} alt="dog-logo" />
      <div className="name-wrapper">
        <img className="treat-icon" src={treats} alt="dog treat icon" />
        <h1 className="name">Dog-A-Gram</h1>
        <img className="treat-icon" src={treats} alt="dog treat icon" />
      </div>
    </header>
  )
}

export default Header;