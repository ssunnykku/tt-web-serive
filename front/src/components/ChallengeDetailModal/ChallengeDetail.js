import React, { useRef, useState, useEffect, useNavigate } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import StyledButton from "../../styles/commonstyles/Button";
import "../../styles/ChallengeDetailModal.css";
// import UserLike from "./UserLike";
import * as Api from "../../api";

const ChallengeDetail = () => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");

  const navigate = useNavigate();

  //useState로 선택한 챌린지 image 상태를 생성함.
  const [challengeImage, setChallengeImage] = useState("");
  //useState로 D-day 상태를 생성함.
  const [chanllegeDday, setChanllegeDday] = useState("");
  const [chanllegeTitle, setChanllegeTitle] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");

  const [challengeJoinNumber, setChallengeJoinNumber] = useState("");
  const [challengePoint, setchallengePoint] = useState("");

  const [challengeManual, setChallengeManual] = useState("");
  const [goodImage, setGoodImage] = useState("");
  const [badImage, setBadImage] = useState("");

  useEffect(() => {
    Api.get("challenges", challengeId).then((res) => setTitle(res.data.title));
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [showContent, setShowContent] = useState("정보수정");
  const [profileImage, setProfileImage] = useState("");
  const fileInput = useRef(null);
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
  const onSubmit = (e) => {
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
  };

  return (
    <div className="userprofile">
      <form className="imageForm" onSubmit={onSubmit}>
        <img
          className="profileImage"
          src={profileImage}
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg, image/png, image/jpeg"
          name="profileImage"
          onChange={onChangeImage}
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
          description={description}
          setDescription={setDescription}
        />
      ) : null}
    </div>
  );
};

export default UserCard;
