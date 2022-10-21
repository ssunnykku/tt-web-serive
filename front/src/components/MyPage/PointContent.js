import React from "react";
import * as Api from "../../api";
import styled from "styled-components";

const Border = styled.div`
  margin-left: 120px;
`;
const Title = styled.h2`
  font-size: 25px;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
  margin-top: 100px;
  margin-left: 100px;
`;

const Count = styled.h3`
  font-size: 25px;
  font-weight: bold;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
  margin-top: 15px;
  margin-left: 100px;
`;
const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 20px auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;
const SubTitle = styled.h3`
  font-size: 27px;
  font-weight: bold;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
  margin-top: 15px;
  margin-left: 100px;
`;
const Description = styled.h4`
  font-size: 27px;
  font-family: "Nanum Gothic", sans-serif;
  text-align: left;
  margin-top: 5px;
  margin-left: 100px;
  margin-bottom: 50px;
`;
const Point = styled.h5`
  font-size: 25px;
  font-weight: bold;
  color: #6a71e6;
  font-family: "Nanum Gothic", sans-serif;
  text-align: right;
  margin-top: 15px;
  margin-left: 100px;
`;
const Detail = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 20px auto;
  display: flex;
`;
const History = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Each = styled.div`
  display: flex;
  justify-content: row;
`;

const StyledButton = styled.button`
  background-color: #6a71e6;
  color: #ffffff;
  font-size: 25px;
  padding: 0.1em 3em;
  border: 0;
  border-radius: 5px;
  display: flex;
  border-radius: 6px;
  margin: 20px auto;
`;

const CreateFont = styled.h2`
  padding: 0.2em 2em;
`;
const data2 = [
  [
    {
      challengeId: 5,
      title: "제목 ",
      holdUserId: "6d93b31c-b5f2-4f9f-a65f-014792effe88",
      description: "내용 ",
      method: "asd",
      fromDate: "2022-10-22",
      toDate: "2022-11-19",
      mainImg: "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321275.jpg",
      explainImg:
        "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321291.jpg,uploads\\프론트엔드 - 복사본-1666282321295.png",
      createdAt: "2022-10-20T16:12:01.300Z",
      updatedAt: "2022-10-20T16:12:01.300Z",
      description: "ㅁㄴㅇ",
      countUpload: 0,
    },
    {
      challengeId: 5,
      title: "제목 ",
      holdUserId: "6d93b31c-b5f2-4f9f-a65f-014792effe88",
      description: "내용 ",
      method: "asd",
      fromDate: "2022-10-22",
      toDate: "2022-11-19",
      mainImg: "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321275.jpg",
      explainImg:
        "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321291.jpg,uploads\\프론트엔드 - 복사본-1666282321295.png",
      createdAt: "2022-10-20T16:12:01.300Z",
      updatedAt: "2022-10-20T16:12:01.300Z",
      description: "ㅁㄴㅇ",
      countUpload: 0,
    },
    {
      challengeId: 5,
      title: "제목 ",
      holdUserId: "6d93b31c-b5f2-4f9f-a65f-014792effe88",
      description: "내용 ",
      method: "asd",
      fromDate: "2022-10-22",
      toDate: "2022-11-19",
      mainImg: "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321275.jpg",
      explainImg:
        "uploads/uploads\\BB1fsA3h 쾰른독일-1666282321291.jpg,uploads\\프론트엔드 - 복사본-1666282321295.png",
      createdAt: "2022-10-20T16:12:01.300Z",
      updatedAt: "2022-10-20T16:12:01.300Z",
      description: "ㅁㄴㅇ",
      countUpload: 0,
    },
  ],
];
// 참가버튼 누르면 포인트 10 획득, 챌린지 개설하기 버튼 누르면 포인트 -50
let data = [
  {
    year: 2022,
    month: 8,
    date: 27,
    dayOfWeek: "월",
    countUpload: 0,
    description: "주 1회 대중교통 이용하기(2022-10-11 ~ 2022-10-31)",
  },
  {
    year: 2022,
    month: 8,
    date: 27,
    dayOfWeek: "월",
    countUpload: 0,
    description: "주 1회 대중교통 이용하기(2022-10-11 ~ 2022-10-31)",
  },
  {
    year: 2022,
    month: 8,
    date: 27,
    dayOfWeek: "월",
    countUpload: 0,
    description: "주 1회 대중교통 이용하기(2022-10-11 ~ 2022-10-31)",
  },
];

const PointContent = () => {
  // const [point, setPoint] = useState("");
  return (
    <>
      <Border>
        <Title>{data2[0].createdAt}</Title>
        <Inner>
          <History>
            {data.map((a, i) => {
              return (
                <Each>
                  <Count>{data[i].countUpload}</Count>
                  <div>
                    <SubTitle>포인트 획득</SubTitle>
                    <Description>{data[i].description}</Description>
                  </div>
                  <Point>10</Point>
                </Each>
              );
            })}
          </History>
        </Inner>
        <StyledButton
        // onClick={() => {
        //   let point = [...shoes];
        //   setPoint(copy);
        // }}
        >
          <CreateFont>더보기</CreateFont>
        </StyledButton>
      </Border>
    </>
  );
};

export default PointContent;
