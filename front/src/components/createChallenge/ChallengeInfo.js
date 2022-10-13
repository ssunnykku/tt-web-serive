import React, { useState } from "react";
import styled from "styled-components";
import challengeInfo from "../../styles/createChallenge/challengeInfo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const ChallengeInfo = () => {
  //useState로 챌린지이름 생성
  const [challengeName, setChallengeName] = useState("");
  //useState로 챌린지인증방법 생성
  const [checkMethod, setCheckMethod] = useState("");
  //useState로 챌린지 설명 생성
  const [description, setDescription] = useState("");
  //useState로 챌린지 시작날짜 생성
  const [startDate, setStartDate] = useState(new Date());
  //useState로 챌린지 끝날짜 생성
  const [endDate, setEndDate] = useState(new Date());

  /**startDate yyyy-MM-dd형식으로 변경 */
  var startYear = startDate.getFullYear();
  var startMonth = ("0" + (startDate.getMonth() + 1)).slice(-2);
  var startDay = ("0" + startDate.getDate()).slice(-2);
  var startDateString = startYear + "-" + startMonth + "-" + startDay;
  /**endDate yyyy-MM-dd형식으로 변경 */
  var endYear = endDate.getFullYear();
  var endMonth = ("0" + (endDate.getMonth() + 1)).slice(-2);
  var endDay = ("0" + endDate.getDate()).slice(-2);
  var endDateString = endYear + "-" + endMonth + "-" + endDay;
  const onStartDate = (data) => {
    setStartDate(data);
  };
  const onEndDate = (data) => {
    setEndDate(data);
  };

  return (
    <>
      <div className="inner">
        <span>이름</span>
        <input
          onChange={(e) => setChallengeName(e.target.value)}
          placeholder=" ex) 주 1회 플로깅"
        ></input>
        <span>인증방법</span>
        <input
          onChange={(e) => setCheckMethod(e.target.value)}
          placeholder=" ex) 쓰레기 봉투 인증"
        ></input>
        <span>설명</span>
        <textarea
          className="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder=" 조깅을 하면서 쓰레기를 줍는 활동 "
        ></textarea>
        <span>기간(시작일 ~ 종료일)</span>
        <div className="date">
          <label for="startDate"></label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            selectsStart
            onChange={onStartDate}
            locale={ko}
            minDate={new Date()}
          />
          <p>~</p>
          <label for="endDate"></label>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={endDate}
            selectsEnd
            endDate={endDate}
            minDate={startDate}
            onChange={onEndDate}
            locale={ko}
          />
        </div>
      </div>
    </>
  );
};

export default ChallengeInfo;
