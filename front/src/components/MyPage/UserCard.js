import React, { useRef, useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/mypage/mypage.css";
import UserEditForm from "./UserEditForm";
import * as Api from "../../api";
import axios from "axios";

const UserCard = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // useEffect(() => {
  Api.get("currentUser").then((res) => setName(res.data.name));
  //   Api.get("userImg").then((res) => setProfileImage(res.data));
  // }, []);
  const [showForm, setShowForm] = useState(false);
  const [showContent, setShowContent] = useState("정보수정");
  const [profileImage, setProfileImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdW1f0vtx6CSeYeTkNJtlAR27mmUGtANNA1g&usqp=CAU"
  );
  const [img, setImg] = useState("");
  const formData = new FormData();
  const fileInput = useRef(null);

  const handlerOnclick = async (e) => {
    setImg(e.target.files[0]);
  };
  const onChangeImage = (e) => {
    // if (e.target.file[0]) {
    // var reader = new FileReader(e.target.file[0]);
    // reader.onload = function () {
    //   result = reader.result;
    // };
    // console.log("result : ", result);
    let res = {};
    try {
      res = Api.put("userImg", {
        img,
      });
      console.log("res", res);
    } catch (err) {
      console.log("userImg 업로드 실패!");
      // }
    }

    Api.get("userImg").then((res) => setProfileImage(res.data));
  };

  const onSubmit = (e) => {
    // //   e.preventDefault();
    // //   const formData = new FormData();
    // //   formData.append("img", e.target.files[0]);
    // //   axios({
    // //     method: "put",
    // //     url: "http://localhost:5001/userImg",
    // //     data: formData,
    // //     headers: {
    // //       "Content-Type": "multipart/form-data",
    // //       Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    // //     },
    // //   });
    // // }
    //   // .post("http://localhost:5001/upload", formData)
    //   //         .then(res => {
    //   //             const { fileName } = res.data;
    //   //             console.log(fileName);
    //   //             setUploadedImg({ fileName });
    //   //             alert("The file is successfully uploaded");
    //   //         })
    //   //         .catch(err => {
    //   //             console.error(err);
    //   //         });
  };

  return (
    <div className="userprofile">
      <form className="imageForm" encType="multipart/form-data">
        <img
          className="profileImage"
          src={profileImage}
          encType="multipart/form-data"
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg, image/png, image/jpeg"
          name="Img"
          onChange={onChangeImage}
          onClick={handlerOnclick}
          ref={fileInput}
        ></input>
      </form>
      <h2>{name}</h2>
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
      {showForm == true ? (
        <UserEditForm
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          setShowForm={setShowForm}
        />
      ) : null}
    </div>
  );
};

export default UserCard;
