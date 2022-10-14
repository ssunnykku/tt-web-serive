import React, { useState, useRef } from "react";
import blankImg from "../../images/createChallengePage/blankImg.png";
import checkImgUploader from "../../styles/createChallenge/checkImgUploader.css";
import sad from "../../images/createChallengePage/sad.png";
import happy from "../../images/createChallengePage/happy.png";

const CheckImgUploader = () => {
  //useState로 인증샷 좋은 예시 이미지 생성
  const [goodImage, setGoodImage] = useState(blankImg);
  //useState로 인증샷 나쁜 예시 이미지 생성
  const [badImage, setBadImage] = useState(blankImg);
  const fileInput = useRef(null);

  const onChangeGoodImage = (e) => {
    if (e.target.files[0]) {
      setGoodImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setGoodImage({ blankImg });
      return;
    }
    //화면에 챌린지 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setGoodImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onChangeBadImage = (e) => {
    if (e.target.files[0]) {
      setBadImage(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setBadImage({ blankImg });
      return;
    }
    //화면에 챌린지 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      {
        /**reader.readyState === 2 -> 파일 로드 상태가 '완료'인지 확인 */
      }
      if (reader.readyState === 2) {
        setBadImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div className="checkImgInner">
        <span className="checkImgTitle">인증샷 예시</span>
        <div className="checkImg">
          <div className="goodImg">
            <span>
              <img className="icon" src={happy}></img>이렇게 찍어주세요!
            </span>
            <img
              className="img"
              src={goodImage}
              onClick={() => {
                fileInput.current.click();
              }}
            ></img>
            <input
              type="file"
              style={{ opacity: "0" }}
              accept="image/jpg, image/png, image/jpeg"
              name="goodImg"
              multiple
              onChange={onChangeGoodImage}
              ref={fileInput}
            ></input>
          </div>
          <div className="badImg">
            <span>
              <img className="icon" src={sad}></img>이렇게 찍으면 안돼요!
            </span>
            <img
              className="img"
              src={badImage}
              onClick={() => {
                fileInput.current.click();
              }}
            ></img>
            <input
              type="file"
              style={{ opacity: "0" }}
              accept="image/jpg, image/png, image/jpeg"
              name="badImg"
              multiple
              onChange={onChangeBadImage}
              ref={fileInput}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckImgUploader;
