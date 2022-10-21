import React, { useRef, useState, useEffect, useContext } from "react";
import "../../styles/ChallengeDetailModal.css";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Close_round_light from "../../images/Close_round_light.png";
import TimeLight from "../../images/challenge/TimeLight1x.png";
import OfficialChallenge from "../../images/challenge/OfficialChallenge1x.png";
import FavoriteLight from "../../images/challenge/FavoriteLight1x.png";
import UserFill from "../../images/challenge/UserFill1x.png";
import Gift from "../../images/challenge/Gift1x.png";
import Happy from "../../images/challenge/Happy1x.png";
import Sad from "../../images/challenge/Sad1x.png";

import { UserStateContext } from "../../App";
import * as Api from "../../api";
import Swal from "sweetalert2";
import UserLike from "../UserLike";

function ChallengeDetailModal({
  challengeDetailModalOpen,
  setChallengeDetailModalOpen,
  challengeItem,
  setChallengeItem,
}) {
  const navigate = useNavigate();
  const params = useParams();
  // const isLogin = !!userState.user;
  const challengeId = { challengeItem };

  // 사용자가 선택한 챌린지의 상태를 생성함
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  // fetchSelectedChallenge 함수가 완료된 이후에만 컴포넌트가 구현되게 함
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  // 챌린지 main image URL 상태를 생성함
  const [challengeImage, setChallengeImage] = useState("");
  // 챌린지 시작까지 남은 날(D-day)
  const [challengeDday, setChallengeDday] = useState("");
  // 챌린지 제목
  const [challengeTitle, setChallengeTitle] = useState("");
  // 챌린지 세부 내용
  const [challengeDescription, setChallengeDescription] = useState("");
  // 해당 챌린지에 참여한 인원수
  const [challengeJoinedNumber, setChallengeJoinedNumber] = useState("");
  // 해당 챌린지 모두 완수시 받을 수 있는 예상 최대 point
  const [challengePoint, setChallengePoint] = useState("");
  // 챌린지 인증 방법 설명
  const [challengeManual, setChallengeManual] = useState("");
  // Good, Bad 인증사진 URL
  const [goodImage, setGoodImage] = useState("");
  const [badImage, setBadImage] = useState("");

  const fetchSelectedChallenge = async () => {
    let res = await Api.get(`challenges/mine/:${challengeId}`);
    const challengeData = res.data.updateChallenge;
    const Dday = challengeData.startRemainingDate;

    setSelectedChallenge(challengeData);
    setChallengeDday(Dday);
    setIsFetchCompleted(true);

    return challengeData, Dday;
  };

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.challengeId) {
      const selectedChallengeId = params.challlengeId;
      fetchSelectedChallenge(selectedChallengeId);
    }
  }, [params, userState, navigate]);

  

  function countDday(Dday) {
    const today = new Date();
    const date = new Date(Dday);
    const dayCount = Math.floor((today - date) / (1000 * 60 * 60 * 24));

    return dayCount;
  }

  const challengeExpectedPoint = async () => {
    const res = await Api.get("challenges/expectPoint/:challengeId");
    const expectedPoint = res.data;
    setChallengePoint(expectedPoint);

    return expectedPoint;
  };

  const challengeCountedJoinUser = async () => {
    const res = await Api.get("countJoinUser/:challengeId");
    const countedJoinUser = res.data;
    setChallengeJoinedNumber(countedJoinUser);

    return countedJoinUser;
  };

  const favoriteChallenge = () => {};

  // 모달창 끄기
  const closeChallengeDetailModal = () => {
    setChallengeDetailModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "currentUser" 엔드포인트로 post요청함.
      let res = {};
      res = await Api.post("userToChallenge", {
        challengeId,
      });
      // console.log("res", res);
      setChallengeDetailModalOpen(false);

      Swal.fire({
        position: "top-center",
        icon: "success",
        text: "챌린지 참가 성공",
      }).then(function () {
        navigate("/network", { replace: true });
      });
    } catch (err) {
      console.log("챌린지 참가에 실패하였습니다.", err);
    }
  };

  return (
    <>
      <div className="modalBackground">
        <div className="challengeDetailModal">
          <div className="challengeDetailModalContents">
            <img
              className="challengeModalCloseBtn"
              src={Close_round_light}
              setChallengeDetailModalOpen={setChallengeDetailModalOpen}
              onClick={closeChallengeDetailModal}
              width="32px"
              height="32px"
              alt="닫기 버튼"
            ></img>

            {/* 챌린지 사진, 제목, 세부내용 */}
            <div className="challengeDetailTop">
              <div className="challengeTopLeft">
                <img
                  className="challengeImage"
                  // src={selectedChallenge.mainImg}
                  alt=""
                ></img>
                <p className="chanllegeDday">
                  <img src={TimeLight} alt="시계"></img> 챌린지 시작까지{" "}
                  {challengeDday}일 전
                </p>
              </div>
              <div className="challengeTopRight">
                <span>
                  <img src={OfficialChallenge} alt="V체크"></img> 공식 챌린지
                  <img
                    className="FavoriteLight"
                    src={FavoriteLight}
                    alt="하트"
                  ></img>
                </span>

                <h5>플로깅</h5>
                <div className="challengeScroll">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse dapibus pellentesque ipsum, id viverra nunc
                  laoreet eu. Etiam blandit libero a dapibus ornare. Sed
                  fermentum justo vel neque fringilla consequat. Pellentesque
                  non maximus ligula, non gravida magna. Nam non arcu imperdiet,
                  aliquet nunc in, lacinia mi. Sed vehicula, nisl eget dignissim
                  ultrices, nunc nulla dapibus mi, eu interdum enim dui et sem.
                  Vestibulum id volutpat ex, non fringilla augue. Nulla ornare
                  lacus id neque dignissim, quis malesuada erat pharetra.
                </div>
              </div>
            </div>

            {/* 참가인원, 포인트 */}
            <div className="challengeDetailMiddle">
              <div className="challengeJoinNumber">
                <p className="personNum colorGray">
                  <img src={UserFill} alt="사람"></img>
                  참가인원
                </p>
                <span className="colorBlack"> {challengeJoinedNumber}명</span>
              </div>

              <div classNmae="challengePoint">
                <p className="expectedPoint colorGray">
                  <img src={Gift} alt="선물상자"></img>
                  포인트
                  <span className="colorBlack"> 총 {challengePoint}포인트</span>
                </p>
              </div>
            </div>

            {/* 챌린지 인증방법 */}
            <div className="challengeDetailBottom">
              <div className="challengeManual">
                <span className="manualTitle">챌린지 인증방법</span>
                <p>Lorem ipsum dolor sit amet</p>
              </div>

              <div className="challengeManualDescription">
                <div className="challengeManualDescriptionLeft">
                  <a>
                    <img src={Happy} alt="웃는 얼굴"></img> 이렇게 찍어주세요!
                  </a>
                  <img
                    className="explainImage"
                    // src={selectedChallenge.explainImg[0]}
                    alt=""
                  ></img>
                  <a className="colorOrange">문구가 잘 보이도록 찍힌 사진</a>
                </div>

                <div className="challengeManualDescriptionRight">
                  <a>
                    <img src={Sad} alt="찡그린 얼굴"></img> 이렇게 하면 안돼요!
                  </a>
                  <img
                    className="explainImage"
                    // src={selectedChallenge.explainImg[1]}
                    alt=""
                  ></img>
                  <a className="colorOrange">문구가 명확히 보이지 않는 사진</a>
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
