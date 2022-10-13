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
        <div className="challengeDetailModal">
          <div className="challengeDetailModalContents">
            <img
              className="closeBtn"
              src={Close_round_light}
              onClick={closeModal}
              width="32px"
              height="32px"
            ></img>

            <div className="challengeDetailTop">
              <div className="challengeTopLeft">
                <img className="challengeImage" src={challengeImage}></img>
                <p className="chanllegeDday">
                  <img src={TimeLight}></img>챌린지 시작까지 {chanllegeDday}일
                  전
                </p>
              </div>
              <div className="challengeTopRight">
                <a>
                  <img src={OfficialChallenge}></img>공식 챌린지
                </a>
                <a>
                  <img src={FavoriteLight}></img>
                </a>
              </div>
            </div>

            <div className="challengeMiddle">
              <div className="challengeJoinNumberPoint">
                <p className="challengeJoinNumber">
                  <img src={UserFill}></img> 참가인원 {challengeJoinNumber}명
                </p>
                <p className="challengePoint">
                  <img src={Gift}></img> 포인트 총 {}포인트
                </p>
              </div>
              <p>챌린지 인증방법</p>
              <p>{challengeManual}</p>
              <div>
                <div>
                  <img src={Happy}></img>
                  <p>이렇게 찍어주세요!</p>
                  <img src={HappyCertificate}></img>
                  <p>"문구가 잘 보이도록 밝은 곳에서 찍힌 사진</p>
                </div>
                <div>
                  <img src={Sad}></img>
                  <p>이렇게 하면 안돼요!</p>
                  <img src={HappyCertificate}></img>
                  <p>"문구가 명확히 보이지 않는 사진</p>
                </div>
              </div>
            </div>

            <button className="challengeJoinBtn" type="submit">
              참가하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpModal;
