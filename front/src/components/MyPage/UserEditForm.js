import React, { useState } from "react";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/userEditForm.css";
const UserEditForm = () => {
  const [email, setEmail] = useState("");
  const [name,setName]=useState('');
  const [description,setDescription]=useState('')

  return (
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
        <StyledButton>수정하기</StyledButton>
      </div>
    </div>
  );
};

export default UserEditForm;
