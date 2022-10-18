import React, { useState } from "react";
import NavBar from "../NavBar";
import "../../styles/mainpage/mainpage2.css";
import StyledButton from "../../styles/commonstyles/Button";
import Gas from "../Charts/chart";
import Disasters from "../Charts/Disasters";
const MainPage2 = () => {
  const [showGraph, setShowGraph] = useState(1);
  return (
    <>
      <div className="mainPage2">
        <NavBar />
        <div className="mainpage2Container">
          <h1>환경오염 현황</h1>
          <div className="mainpage2ButtonContainer">
            <StyledButton
              onClick={(e) => {
                setShowGraph(1);
              }} 
            >
              온실가스
            </StyledButton>
            <StyledButton
              onClick={(e) => {
                setShowGraph(2);
              }}
            >
              폐기물
            </StyledButton>
            <StyledButton
              onClick={() => {
                setShowGraph(3);
              }}
            >
              에너지 낭비
            </StyledButton>
          </div>
          {showGraph == 1 ? (
            <div className="ex2GraphContainer">
              <Gas/>
            </div>
          ) : null}
          {showGraph == 2 ? (
            <div className="ex2GraphContainer">
              <Disasters/>
            </div>
          ) : null}
          {showGraph == 3 ? (
            <div className="ex2GraphContainer">
              <h1>이미지3</h1>
              <h1>이미지3</h1>
              <h1>이미지3</h1>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MainPage2;
