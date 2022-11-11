import React, { useEffect, useState } from "react";
import * as Api from "../../api";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import arrow_drop_down from "../../images/myPage/arrow_drop_down.svg";
import expand_more from "../../images/myPage/expand_more.svg";

const Border = styled.div`
  margin-left: 120px;
  width: 90%;
`;

const ChallengeName = styled.h2`
  font-size: 25px;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 20px auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const PointTitle = styled.div`
  font-family: "Nanum Gothic", sans-serif;
  font-size: 28px;
  display: flex;
  flex-direction: row;
  align-item: center;
  margin-top: 40px;
`;

const ArrowDropImg = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ChallengeTitle = styled.h3`
  font-size: 23px;
  font-weight: bold;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
`;

const JoinedChallengePoint = styled.div`
  padding-right: 20%;
`;

const EachJoinedChallenge = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
`;

const JoinedChallengeDate = styled.h3`
  padding-left: 50px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Nanum Gothic", sans-serif;
`;

const JoinedChallengeDetail = styled.h3`
  padding-right: 30px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
  font-family: "Nanum Gothic", sans-serif;
`;

const MinusPoint = styled.h5`
  font-size: 20px;
  font-weight: bold;
  color: red;
  font-family: "Nanum Gothic", sans-serif;
  padding-top: 6%;
`;

const Point = styled.h5`
  font-size: 20px;
  font-weight: bold;
  color: #6a71e6;
  font-family: "Nanum Gothic", sans-serif;
`;

const Each = styled.div`
  weight: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.7fr 1fr;

  .item:nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }
`;

const ShoeMorePointButton = styled.button`
  background-color: #6a71e6;
  color: #ffffff;
  font-size: 25px;
  padding: 0.1em 3em;
  border: 0;
  border-radius: 5px;
  display: flex;
  border-radius: 6px;
  // margin: 20px auto;
  margin-left: 350px;
`;

const CreateFont = styled.h2`
  padding: 0.2em 2em;
`;

// 참가버튼 누르면 포인트 10 획득, 챌린지 개설하기 버튼 누르면 포인트 -50

const PointContent = ({ myChallengeList }) => {
  const [visible, setVisible] = useState(10);
  const [joinedChallengeList, setJoinedChallengeList] = useState([]);
  useEffect(() => {
    Api.get("pointinfo").then((res) => {
      setJoinedChallengeList(res.data);
      // console.log(res.data[0].challenges.challengeId);
    });
  }, []);
  return (
    <>
      <Border>
        <PointTitle>포인트 획득 내역</PointTitle>
        <Inner>
          {myChallengeList.slice(0, visible).map((x, i) => {
            return (
              <Each key={myChallengeList[i].challenge["challengeId"]}>
                <ChallengeName className="item">
                  <ArrowDropImg src={expand_more}></ArrowDropImg>
                  <ChallengeTitle>
                    {myChallengeList[i].challenge["title"]}(
                    {myChallengeList[i].challenge["fromDate"]}~
                    {myChallengeList[i].challenge["toDate"]})
                  </ChallengeTitle>
                </ChallengeName>
                <MinusPoint className="item">-50</MinusPoint>
                <JoinedChallengePoint className="item">
                  {joinedChallengeList.map((x, j) => {
                    if (
                      joinedChallengeList[j].challenges.challengeId ==
                      myChallengeList[i].challenge["challengeId"]
                    ) {
                      return (
                        <EachJoinedChallenge>
                          <JoinedChallengeDate>
                            {joinedChallengeList[j].createAt.substr(0, 10)}
                          </JoinedChallengeDate>
                          <JoinedChallengeDetail>
                            포인트 획득
                          </JoinedChallengeDetail>
                          <Point>10</Point>
                        </EachJoinedChallenge>
                      );
                    }
                  })}
                </JoinedChallengePoint>
              </Each>
            );
          })}
        </Inner>
        {/* <ShoeMorePointButton>
          <CreateFont>더보기</CreateFont>
        </ShoeMorePointButton> */}
      </Border>
    </>
  );
};

export default PointContent;
