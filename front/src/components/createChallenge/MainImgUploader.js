import { SettingFilled } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import blankImg from "../../images/createChallengePage/blankImg.png";
import MainImgUploader from "../../styles/createChallenge/MainImgUploader.css";

const MainImgUpoloader = () => {
  //useState로 챌린지메인이미지 생성
  const [challengeImage, setChallengeImage] = useState(blankImg);
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setChallengeImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setChallengeImage(blankImg);
      return;
    }
    //화면에 챌린지 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setChallengeImage(reader.result);
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
    <>
      <form onSubmit={onSubmit}>
        {/**useRef()변수를 생성해서 사진을 클릭하면 파일 업로더를 띄울 수 있도록 onClick함수의 이벤트에 넣어줌 */}
        <div className="mainInner">
          <img
            className="main"
            src={challengeImage}
            onClick={() => {
              fileInput.current.click();
            }}
          ></img>
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg, image/png, image/jpeg"
            name="challengeImg"
            onChange={onChange}
            ref={fileInput}
          ></input>
        </div>
      </form>
    </>
  );
};

export default MainImgUpoloader;
