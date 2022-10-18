import React, { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import CheckImgUploader from "../components/createChallenge/CheckImgUploader";
import ChallengeInfo from "../components/createChallenge/ChallengeInfo";
import MainImgUpoloader from "../components/createChallenge/MainImgUploader";
// import StyledButton from "../styles/commonstyles/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../App";
// import { DispatchContext, UserStateContext } from "../../App";
// import Api from "..api";

{
  /**챌린지 개설하기 스타일 설정 */
}
const Title = styled.h2`
  font-size: 25px;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`;
const Line = styled.hr`
  border: solid 1px #9c9c9c;
  width: 160px;
  position: relative;
  margin: auto;
  justify-content: center;
  display: flex;
`;
const Inner = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 20px auto;
  justify-content: center;
  display: flex;
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
const CreateChallenge = () => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [user, setUsers] = useState([]);
  // // const dispatch = useContext(DispatchContext);

  return (
    <>
      <NavBar />
      <hr></hr>
      <Title>챌린지 개설하기</Title>
      <Line></Line>
      <Inner>
        <MainImgUpoloader></MainImgUpoloader>
        <ChallengeInfo></ChallengeInfo>
      </Inner>

      <CheckImgUploader></CheckImgUploader>

      <StyledButton>
        <CreateFont>챌린지 생성하기</CreateFont>
      </StyledButton>
    </>
  );
};

export default CreateChallenge;
