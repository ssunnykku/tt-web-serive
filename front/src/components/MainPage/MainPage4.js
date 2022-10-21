import React from "react";
import NavBar from "../NavBar";
import "../../styles/mainpage/mainpage4.css";
import StyledButton from "../../styles/commonstyles/Button";
// import * as Api from "../../api";
const MainPage4 = () => {
  // Api.get("chllenges/mine/18").then((res) => console.log(res));
  return (
    <div className="mainPage4">
      <NavBar />
      <div className="mainPage4TextContainer">
        <h1>지구를 살리는 환경습관 기르기</h1>
        <div className="textBox">
          <h1>지금 당장</h1> <h1 className="missioncheck">오늘내일</h1>
        </div>
        <h1>시작하세요</h1>
      </div>
      <div className="buttonContainer">
        <StyledButton className="main4Btn">
          <h1>챌린지하러 가기</h1>
        </StyledButton>
      </div>
      <div className="footer">
        <a> 오늘내일 created by 5늘</a>
        <a> 문의:whgkdms777@gmail.com</a>
      </div>
    </div>
  );
};

export default MainPage4;
