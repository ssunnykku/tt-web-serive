import React, { useState } from "react";
import "../styles/navbar/navbar.css";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import SignUpModal from "../components/signUpModal/SignUpModal";

const NavBar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("nav-menu");
  const [toggleIcon, setToggleIcon] = useState("nav-toggler");

  // const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const navToggle = () => {
    active === "nav-menu"
      ? setActive("nav-menu nav-active")
      : setActive("nav-menu");

    toggleIcon === "nav-toggler"
      ? setToggleIcon("nav-toggler toggle")
      : setToggleIcon("nav-toggler");
  };

  // const showSignUpModal = () => {
  //   setSignUpModalOpen(true);
  // };
  return (
    <div className="navBar">
      <nav className="nav">
        <a
          onClick={() => {
            navigate("/");
          }}
          className="nav-brand"
        >
          ✓미션체크
        </a>
        <ul className={active}>
          <li className="nav-item">
            <a
              onClick={() => {
                navigate("/");
              }}
              className="nav-link"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                navigate("/mypage");
              }}
              href="#"
              className="nav-link"
            >
              MyPage
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                navigate("/network");
              }}
              className="nav-link"
            >
              Challenges
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Login/Join
            </a>
          </li>
        </ul>
        <div onClick={navToggle} className={toggleIcon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
