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
    const [mainImg,setMainImg]=useState('')
    const [remainDate,setRemainDate]=useState()
    const [title,setTitle]=useState('제목')
    const [playPoint,setPlayPoint]=useState(0);
    const [expectedPoint,setExpectedPoint]=useState(0);
    const [challengeData,setChallengeData]=useState([]);
    useEffect(()=>{
      Api.get(`challenges/mine/${realId}`).then((res)=>setChallengeData(res.data.updateChallenge))
    },[])
    // Api.get(`challenges/mine/:${realId}}`).then((res)=>console.log(res))
    console.log(challengeData.fromDate)
    console.log(challengeData.toDate -challengeData.fromDate)
    const getDateDiff=(d1,d2)=>{
      const date1=new Date(d1);
      const date2=new Date(d2);
      const diffDate=date1.getTime()-date2.getTime();
      return Math.abs(diffDate/(1000*60*60*24));
    }
    console.log(challengeData.fromDate=='2022-10-22')
    let dif=getDateDiff(challengeData.fromDate,challengeData.toDate)
    
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
              <NetworkCard item={challengeData}/>
            </div>
        </div>
        <div className="mainContent">
          
          <div className="imgContents">이미지들</div>
          
          <div className="pointContents">
            <div>
              참가 포인트 50
            </div>
            <div>
              최대 포인트 {dif*10}
            </div>
          </div>
          <div className="buttonContents"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckChallenge;
