import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/network/networkcard.css";
import ChallengeDetailModal from "./ChallengeDetailModal/ChallengeDetailModal";
import UserLike from "./UserLike";
const NetworkCard = ({ item }) => {
  const [challengeDetailModalOpen, setChallengeDetailModalOpen] =
    useState(false);
  const [challengeItem, setChallengeItem] = useState(null);

  const showChallengeDetailModalOpen = () => {
    setChallengeDetailModalOpen(true);
    setChallengeItem(item.challengeId);
  };
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);
  const dateString = year + "-" + month + "-" + day;
  return (
    <Card
      id="cardBody"
      className="mb-3 ms-3 mr-5 card-body"
      style={{
        width: "16rem",
        borderRadius: "3%",
        border:
          new Date(item.fromDate) <= new Date(dateString)
            ? "none "
            : "2px solid #6A71E6",
        background:
          new Date(item.fromDate) <= new Date(dateString)
            ? "rgb(179, 176, 176, 0.6)"
            : "none",
      }}
    >
      <Card.Body>
        <div className="imageWrap">
          <Card.Img
            className="mb-3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM79qhm5WWiW46jcsrREwPVX87kZygj9CQDw&usqp=CAU"
            alt="대표 사진"
            onClick={showChallengeDetailModalOpen}
          />

<Card.Title onClick={showChallengeDetailModalOpen}>
            {item?.title}
          </Card.Title>

          <div className="cardtext">
            👨‍👧‍👧 100
            <UserLike challengeId={item.challengeId} />
          </div>
          <div className="duration">
            <a className="cardSubText">
              {item?.fromDate}-{item?.toDate}
            </a>{" "}
          </div>
          {challengeDetailModalOpen && (
            <ChallengeDetailModal
              setChallengeDetailModalOpen={setChallengeDetailModalOpen}
            />
          )}
          {<challengeDetailModal setChallengeItem={setChallengeItem} />}
        </div>
      </Card.Body>
    </Card>
  );
};

export default NetworkCard;
