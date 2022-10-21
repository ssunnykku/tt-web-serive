import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NetworkCard from "../components/NetworkCard";
import { useParams } from "react-router-dom";
import "../styles/checkChallenge.css";
import * as Api from '../api'
import Dropdown from "../components/Dropdown";
import CheckDropdown from "../components/Dropdown";

const CheckChallenge = () => {
    let {id}=useParams();
    let realId=parseInt(id);
    console.log( realId)
    const [mainImg,setMainImg]=useState('')
    const [remainDate,setRemainDate]=useState()
    const [title,setTitle]=useState('제목')
    const [playPoint,setPlayPoint]=useState(0);
    const [expectedPoint,setExpectedPoint]=useState(0);
    const [data,setData]=useState([]);
    useEffect(()=>{
      Api.get(`challenges/mine/:${realId}`).then((res)=>setData(res))
    },[])
    // Api.get(`challenges/mine/:${realId}}`).then((res)=>console.log(res))
    
  return (
    <div className="checkChallenge">
      <NavBar />
      <div className="upperSection"></div>
      <div className="checkText">
        <a>챌린지 인증하기</a>
      </div>
      <div className="checkContents">
        <div className="mainimg">
            <div className="imgsize">
              {/* <NetworkCard /> */}
            </div>
        </div>
        <div className="mainContent">
          <div className="dropdowncontents">
            <CheckDropdown/>
          </div>
          <div className="selectWeek">
            <div className="firstWeek"><a>1주차</a></div>
            <div className="secondWeek"><a>2주차</a></div>
            <div className="thirdWeek"><a>3주차</a></div>
            <div className="fourthWeek"><a>4주차</a></div>
          </div>
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
