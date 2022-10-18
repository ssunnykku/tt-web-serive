import React from "react";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../signUpModal/SignUpModal";
import "../../styles/mainpage/mainpage1.css";
import StyledButton from "../../styles/commonstyles/Button";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

const MainPage1 = () => {
  //열기, 닫기를 부모로부터 받아옴
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const navigate = useNavigate();
  //로그인 모달창 노출
  const showLoginModal = () => {
    setLoginModalOpen(true);
    setSignUpModalOpen(false);
  };

  // //회원가입 모달창 노출
  //   const showSignUpModal = () => {
  //     setSignUpModalOpen(true);
  //   };

  // const isLogin= !!userState.user;
  const isLogin = false;
  // const logout=()=>{
  //   sessionStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');
  //   dispatchEvent({type:'LOGOUT'});
  //   alert('로그아웃 완료')
  //   navigate('/')
  // }

  console.log("setLoginModalOpen", loginModalOpen);

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
            {isLogin === false ? (
              <StyledButton onClick={showLoginModal}>로그인</StyledButton>
            ) : (
              <StyledButton>로그아웃</StyledButton>
            )}

            {loginModalOpen && (
              <LoginModal
                setLoginModalOpen={setLoginModalOpen}
                signUpModalOpen={signUpModalOpen}
                setSignUpModalOpen={setSignUpModalOpen}
              />
            )}
            {signUpModalOpen && (
              <SignUpModal
                signUpModalOpen={signUpModalOpen}
                setSignUpModalOpen={setSignUpModalOpen}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage1;
