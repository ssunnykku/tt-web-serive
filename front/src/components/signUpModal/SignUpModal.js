import React from "react";
import { useState } from "react";
import "../../styles/signUpModal.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Close_round_light from "../../images/Close_round_light.png";

import * as Api from "../../api";

function SignUpModal({ setSignUpModalOpen }) {
  //   const navigate = useNavigate();
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 checkEmail 상태를 생성함.
  const [checkEmail, setCheckEmail] = useState("");
  //useState로 pwd 상태를 생성함.
  const [pwd, setPwd] = useState("");
  //useState로 checkPwd 상태를 생성함.
  const [checkPwd, setCheckPwd] = useState("");
  //useState로 checkBox 상태를 생성함.
  const [checkBox, setCheckBox] = useState(false);

  // const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  //email 인증메일로 받는거 해야함, 지금은 이메일 형태인지만 체크하고 있음
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };
  const validatePwd = (pwd) => {
    // 비밀번호 : 숫자+영문자+특수문자 조합으로 8자리 이상 입력
    return pwd
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
  };
  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPwdValid = validatePwd(pwd);
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPwdSame = pwd === checkPwd;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isPwdValid && isPwdSame && isNameValid;

  //   checkBox 체크
  const clickCheckedBox = () => {
    setCheckBox(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        name,
        email,
        password,
      });

      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };
  //모달창 끄기
  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };
  console.log(setSignUpModalOpen);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="modalBackground">
          <div className="signUpModal">
            <div className="signUpModalContents">
              <img
                className="closeBtn"
                src={Close_round_light}
                onClick={closeSignUpModal}
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
              <button
                className="signUpBtn"
                type="submit"
                disabled={!isFormValid}
              >
                회원가입하기
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default SignUpModal;
