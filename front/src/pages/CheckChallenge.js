import React, { useState } from "react";
import NavBar from "../components/NavBar";
import NetworkCard from "../components/NetworkCard";

import "../styles/checkChallenge.css";
import * as Api from '../api'

const CheckChallenge = () => {
    const [mainImg,setMainImg]=useState('')
    const [remainDate,setRemainDate]=useState()
    const [title,setTitle]=useState('')
    const [playPoint,setPlayPoint]=useState(0);
    const [expectedPoint,setExpectedPoint]=useState(0);

  return (
    <div className="checkChallenge">
      <NavBar />
      <div className="upperSection"></div>
      <div className="checkText">
        <a>챌린지 인증하기</a>
      </div>
      <div className="checkContents">
        <div className="mainimg">
            <div className="imgsize"></div>
            <h1> 안녕</h1>
        </div>
        <div className="mainContent">
          <div className="dropdowncontents"></div>
          <div className="selectWeek"></div>
          <div className="imgContents"></div>
          <div className="textContents"></div>
          <div className="pointContents"></div>
          <div className="buttonContents"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckChallenge;
