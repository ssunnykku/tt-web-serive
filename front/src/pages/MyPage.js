import React, { useRef, useState } from "react";
import ChallengeContent from "../components/MyPage/ChallengeContent";
import LikedContent from "../components/MyPage/LikedContent";
import PointContent from "../components/MyPage/PointContent";
import UserCard from "../components/MyPage/UserCard";
import NavBar from "../components/NavBar";
import StyledButton from "../styles/commonstyles/Button";
import "../styles/mypage/mypage.css";

const MyPage = () => {
  const fileInput = useRef(null);
  const [contents, setContents] = useState(<PointContent />);
  return (
    <div className="myPage">
      <NavBar />
      <div className="myPageExceptNav">
        <UserCard />
        <div className="restPage">
          <div className="upperbar">
            <div onClick={()=>{
                setContents(<PointContent/>)
            }} className="point">
              <h2>My Point</h2>
              <h1>500P</h1>
            </div>
            <div onClick={()=>{
                setContents(<ChallengeContent/>)
            }} className="challange">
              <h2>My Challenge</h2>
              <h1>2</h1>
            </div>
            <div onClick={()=>{
                setContents(<LikedContent/>)
            }} className="liked">
              <h2>Liked</h2>
              <h1>3</h1>
            </div>
          </div>
          <div className="btnContainer">
          <StyledButton>진행중</StyledButton>
          <StyledButton>완료</StyledButton>
          <StyledButton>내가만든챌린지</StyledButton>
          </div>
          <div className="contents">
          {contents}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MyPage;
