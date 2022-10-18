import React, { useEffect, useState } from "react";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/userEditForm.css";
import * as Api from '../../api'
import { Form } from "react-bootstrap";
const UserEditForm = ({name, setName, description, setDescription}) => {
const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    await Api.put('userUpdate', {
      name: name,
      description: description,
    });
  } catch(e){
    console.error(e)
  }
}
  return (
    <form onSubmit={handleSubmit}>
    <div className="userEditForm">
     
      <h5>닉네임</h5>
      <div className="nameInput">
        <input
        placeholder="이름을 입력하세요"
        onChange={(e)=>{
            setName(e.target.value)
        }}
        />
      </div>
      
      <h5>자기소개</h5>
      <div className="descriptionInput">
        <textarea
        placeholder="자기소개하기"
        onChange={(e)=>{
            setDescription(e.target.value)
        }}
        />
      </div>
      <div className="btnContainer">
        <StyledButton onClick={handleSubmit}>수정하기</StyledButton>
      </div>
    </div>
    </form>
  );
};

export default UserEditForm;
