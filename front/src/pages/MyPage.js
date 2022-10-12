import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import ChallengeContent from "../components/MyPage/ChallengeContent";
import LikedContent from "../components/MyPage/LikedContent";
import PointContent from "../components/MyPage/PointContent";
import UserCard from "../components/MyPage/UserCard";
import NavBar from "../components/NavBar";
import StyledButton from "../styles/commonstyles/Button";
import "../styles/mypage/mypage.css";
import data from "../components/network/data";
const MyPage = () => {
  var today = new Date();
  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;
  const originalData = data;
  const [ChallengeList, setChallengeList] = useState(data);
  const [initialState, setInitialState] = useState("골라서 보기");
  const [showDrop, setShowDrop] = useState(false);
  const [contents, setContents] = useState(1);
  return (
    <div className="myPage">
      <NavBar />
      <div className="myPageExceptNav">
        <UserCard />
        <div className="restPage">
          <div className="upperbar">
            <div
              onClick={() => {
                setContents(1);
                setShowDrop(false);
              }}
              className="point"
            >
              <h2>My Point</h2>
              <h1>500P</h1>
            </div>
            <div
              onClick={() => {
                setContents(2);
                setShowDrop(true);
              }}
              className="challange"
            >
              <h2>My Challenge</h2>
              <h1>2</h1>
            </div>
            <div
              onClick={() => {
                setContents(3);
                setShowDrop(false);
              }}
              className="liked"
            >
              <h2>Liked</h2>
              <h1>3</h1>
            </div>
          </div>
          <div className="btnContainer"></div>
          {showDrop == true ? (
            <Dropdown className="dropdownbtn">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {initialState}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setInitialState("진행중");
                    let results = originalData.filter(
                      (item) => new Date(item.toDate) >= new Date(dateString)
                    );
                    console.log(results);
                    setChallengeList(results);
                  }}
                >
                  진행중
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setInitialState("완료");
                    let results = originalData.filter(
                      (item) => new Date(item.toDate) <= new Date(dateString)
                    );
                    console.log(results);
                    setChallengeList(results);
                  }}
                >
                  완료
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setInitialState("내가 만든");
                  }}
                >
                  내가 만든
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : null}

          <div className="contents">
            {contents===1&& <PointContent/>}
            {contents===2&& <ChallengeContent ChallengeList={ChallengeList}/>}
            {contents===3&& <LikedContent ChallengeList={ChallengeList}/>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
