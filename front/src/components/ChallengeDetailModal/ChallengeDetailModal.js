import React from "react";
import { useState } from "react";
import "../../styles/ChallengeDetailModal.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Close_round_light from "../../images/Close_round_light.png";
import TimeLight from "../../images/challenge/TimeLight1x.png";
import OfficialChallenge from "../../images/challenge/OfficialChallenge1x.png";
import FavoriteLight from "../../images/challenge/FavoriteLight1x.png";
import UserFill from "../../images/challenge/UserFill1x.png";
import Gift from "../../images/challenge/Gift1x.png";
import Happy from "../../images/challenge/Happy1x.png";
import Sad from "../../images/challenge/Sad1x.png";
import Baemin from "../../images/challenge/Baemin.png";
import HappyCertificate from "../../images/challenge/HappyCertificate.png";
import SadCertificate from "../../images/challenge/SadCertificate.png";

// import Modal from "../../Modals/Modal";

function ChallengeDetailModal({ setModalOpen }) {
  //const navigate = useNavigate();

  //useState로 image 상태를 생성함.
  const [challengeImage, setChallengeImage] = useState("");
  //useState로 D-day 상태를 생성함.
  const [chanllegeDday, setChanllegeDday] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [challengeJoinNumber, setChallengeJoinNumber] = useState("");
  const [challengeManual, setChallengeManual] = useState("");
  const [happyCertificate, setHappyCertificate] = useState("");
  const [sadCertificate, setSadCertificate] = useState("");

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

  return (
    <>
      <div className="modalBackground">
        <div className="challengeDetailModal">
          <div className="challengeDetailModalContents">
            <img
              className="challengeModalCloseBtn"
              src={Close_round_light}
              onClick={closeModal}
              width="32px"
              height="32px"
              alt="닫기 버튼"
            ></img>

            <div className="challengeDetailTop">
              <div className="challengeTopLeft">
                <img
                  className="challengeImage"
                  src={Baemin}
                  style={{ width: 310, height: 240, margin: 0 }}
                  alt="해당 챌린지 사진"
                ></img>
                <p className="chanllegeDday">
                  <img src={TimeLight} alt="시계"></img> 챌린지 시작까지{" "}
                  {chanllegeDday}일 전
                </p>
              </div>
              <div className="challengeTopRight">
                <span>
                  <img src={OfficialChallenge} alt="V체크"></img> 공식 챌린지
                </span>
                <a>
                  <img
                    src={FavoriteLight}
                    style={{ marginLeft: 170 }}
                    alt="하트"
                  ></img>
                </a>
                <h4>주 1회 배달 용기 안받기</h4>
                <div
                  style={{
                    overflow: "scroll",
                    width: 290,
                    height: 170,
                    padding: 10,
                    backgroundColor: "gray",
                    marginTop: 11,
                  }}
                >
                  주 1일 2주 동안, 하루에 인증샷을 1번 찍어야해요! 배민에서
                  시킬때, 배달용기 안받기 체크해서 주문하기!! 인증샷 사진이
                  명확히 잘 나오게 찍어주세요~!
                </div>
              </div>
            </div>

            <div className="challengeMiddle">
              <div className="challengeJoinNumberPoint">
                <p className="challengeJoinNumber" style={{ color: "#9C9C9C" }}>
                  <img
                    src={UserFill}
                    alt="사람"
                    style={{ marginLeft: 80 }}
                  ></img>
                  참가인원
                  <span style={{ color: "black" }}>
                    {" "}
                    {challengeJoinNumber}명
                  </span>
                </p>
                <p
                  className="challengePoint"
                  style={{ color: "#9C9C9C", marginLeft: 250 }}
                >
                  <img src={Gift} alt="선물상자"></img>
                  포인트
                  <span style={{ color: "black" }}> 총 {}포인트</span>
                </p>
              </div>

              <div className="challengeManual">
                <span style={{ marginLeft: 30 }}>챌린지 인증방법</span>
                <p style={{ marginLeft: 30, marginTop: 10, marginBottom: 0 }}>
                  "배달용기 필요없어요" 문구가 적힌 영수증을 사진 찍기
                </p>
              </div>

              <div className="challengeManualDescription">
                <div className="challengeManualDescriptionLeft">
                  <p style={{ marginTop: 0, marginBottom: 5 }}>
                    <img src={Happy} alt="웃는 얼굴"></img> 이렇게 찍어주세요!
                  </p>
                  <img
                    src={HappyCertificate}
                    style={{ width: 240, height: 180, margin: 0 }}
                    alt=""
                  ></img>
                  <p
                    style={{ color: "orange", marginTop: 10, marginBottom: 5 }}
                  >
                    문구가 잘 보이도록 밝은 곳에서 찍힌 사진
                  </p>
                </div>

                <div className="challengeManualDescriptionRight">
                  <p style={{ marginTop: 0, marginBottom: 5 }}>
                    <img src={Sad} alt="찡그린 얼굴"></img> 이렇게 하면 안돼요!
                  </p>
                  <img
                    src={SadCertificate}
                    style={{ width: 240, height: 180, margin: 0 }}
                    alt=""
                  ></img>
                  <p
                    style={{ color: "orange", marginTop: 10, marginBottom: 5 }}
                  >
                    문구가 명확히 보이지 않는 사진
                  </p>
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

export default ChallengeDetailModal;
