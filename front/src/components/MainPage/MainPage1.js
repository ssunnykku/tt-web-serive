import React from "react";
import "../../styles/mainpage/mainpage1.css";
import StyledButton from "../../styles/commonstyles/Button";
import NavBar from "../NavBar";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
const MainPage1 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mainPage1">
        <NavBar />
        <div className="mainPageContainer">
          <a>환경챌린지의 모든 것</a>
          <div className="secondlinetext">
            <a className="missioncheck">✓미션체크</a>
            <a>에서 쉽고 빠르게</a>
          </div>
          <div className="buttonContainer">
            <StyledButton
              onClick={() => {
                navigate("/network");
              }}
            >
              챌린지
            </StyledButton>
            <StyledButton>로그인</StyledButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage1;
