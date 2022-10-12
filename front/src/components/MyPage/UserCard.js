import React, { useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/mypage.css";
const UserCard = () => {
  return (
    <div className="userprofile">
      <img
        id="round"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdW1f0vtx6CSeYeTkNJtlAR27mmUGtANNA1g&usqp=CAU"
        
      />
      <h1>유저이름</h1>
      <StyledButton>편집하기</StyledButton>
    </div>
  );
};

export default UserCard;


