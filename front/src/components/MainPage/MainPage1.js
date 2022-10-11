import React from "react";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import "../../styles/mainpage/mainpage1.css";
import StyledButton from "../../styles/commonstyles/Button";
import NavBar from "../NavBar";

const MainPage1 = () => {
  //열기, 닫기를 부모로부터 받아옴
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  //로그인 모달창 노출
  const showLoginModal = () => {
    setLoginModalOpen(true);
  };

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
            <StyledButton>챌린지</StyledButton>
            <StyledButton onClick={showLoginModal}>로그인</StyledButton>
            {loginModalOpen && (
              <LoginModal setLoginModalOpen={setLoginModalOpen} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage1;
