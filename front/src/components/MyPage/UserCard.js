import React, { useRef, useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/mypage.css";
import UserEditForm from "./UserEditForm";
const UserCard = () => {
  const [showForm, setShowForm] = useState(false);
  const [showContent, setShowContent] = useState("정보수정");
  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdW1f0vtx6CSeYeTkNJtlAR27mmUGtANNA1g&usqp=CAU"
  );
  const fileInput=useRef(null);
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    } else {
      setProfileImage(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdW1f0vtx6CSeYeTkNJtlAR27mmUGtANNA1g&usqp=CAU"
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onSubmit=(e)=>{
     //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("img", content);
    //     axios
    //         .post("http://localhost:3001/upload", formData)
    //         .then(res => {
    //             const { fileName } = res.data;
    //             console.log(fileName);
    //             setUploadedImg({ fileName });
    //             alert("The file is successfully uploaded");
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
  }

  return (
    <div className="userprofile">
      <img id="round" src={profileImage} onClick={()=>{
        fileInput.current.click();
      }} />
      <input
      type='file'
      style={{display:'none'}}
      accept='image/jpg, image/png, image/jpeg'
      name="profileImage"
      onChange={onChangeImage}
      ref={fileInput}
      ></input>
      <h1>유저이름</h1>
      <StyledButton
        onClick={() => {
          showForm == true ? setShowForm(false) : setShowForm(true);
          showContent == "정보수정"
            ? setShowContent("취소하기")
            : setShowContent("정보수정");
        }}
      >
        {showContent}
      </StyledButton>
      {showForm == true ? <UserEditForm /> : null}
    </div>
  );
};

export default UserCard;
