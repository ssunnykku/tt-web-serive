import React from "react";
import { useState } from "react";
import "../../styles/signUpModal.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Close_round_light from "../../images/Close_round_light.png";
// import Modal from "../../Modals/Modal";

function SignUpModal({ setModalOpen }) {
  //   const navigate = useNavigate();
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // "user/register" 엔드포인트로 post요청함.
    //   await Api.post("user/register", {
    //     email,
    //     password,
    //     name,
    //   });

    //   // 로그인 페이지로 이동함.
    //   navigate("/login");
    // } catch (err) {
    //   console.log("회원가입에 실패하였습니다.", err);
    // }
  };
  //모달창 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  // {
  //   challangeId: 1,
  //   title: "플로깅",
  //   userId: 31,
  //   pointId: 3,
  //   description: "플로깅을통한 환경보호",
  //   fromDate: "2022-10-08",
  //   toDate: "2022-10-14",
  //   createdAt: "2022-10-01",
  //   updatedAt: "만든시간",
  // }

  return (
    <>
      <div className="modalBackground">
        <div className="signUpModal">
          <div className="signUpModalContents">
            <img
              className="closeBtn"
              src={Close_round_light}
              onClick={closeModal}
              width="32px"
              height="32px"
            ></img>
            <span className="title">회원가입</span>
            <h3>이름</h3>
            <input
              placeholder="이름을 입력해 주세요"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            {!isNameValid && (
              <alert>이름은 2글자 이상으로 설정해 주세요.</alert>
            )}
            <h3>이메일</h3>
            <div className="emailBox">
              <input
                className="emailInputBox"
                placeholder="(예시) mission123@gmail.com"
                onChange={(e) => {
                  setCheckEmail(e.target.value);
                }}
              ></input>
              <button className="emailCheck">이메일 중복확인</button>
            </div>
            {!isEmailValid && <alert>이메일 형식이 올바르지 않습니다.</alert>}
            <h3>비밀번호</h3>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            ></input>
            {!isPwdValid && (
              <alert>
                숫자,영문자,특수문자 조합으로 8자리 이상 설정해 주세요.
              </alert>
            )}
            <h3>비밀번호 확인</h3>
            <input
              type="password"
              placeholder="비밀번호를 다시 한번 입력해 주세요."
              onChange={(e) => {
                setCheckPwd(e.target.value);
              }}
            ></input>
            {!isPwdSame && <alert>비밀번호가 일치하지 않습니다.</alert>}
            <div className="checkBoxContents">
              <input
                type="checkBox"
                className="checkBox"
                onClick={clickCheckedBox}
              ></input>
              <span>개인정보 수집 및 이용 동의(필수)</span>
            </div>
            <button className="signUpBtn" type="submit" disabled={!isFormValid}>
              회원가입하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpModal;
