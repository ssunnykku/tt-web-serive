import React, { useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/mypage.css";
import UserEditForm from "./UserEditForm";
const UserCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showContent, setShowContent] = useState("정보수정");
  return (
    <div className="userprofile">
      <img
        id="round"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdW1f0vtx6CSeYeTkNJtlAR27mmUGtANNA1g&usqp=CAU"
      />
      <h1>유저이름</h1>
      <StyledButton
        onClick={() => {
          showForm == true ?  setShowForm(false) : setShowForm(true);
          showContent == '정보수정'? setShowContent('취소하기') : setShowContent('정보수정')
        }}
        
      >
        {showContent}
      </StyledButton>
      {showForm == true ? <UserEditForm /> : null}
    </div>
  );
};

export default UserCard;
