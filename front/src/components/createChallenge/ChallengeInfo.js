import React, { useState } from "react";
import styled from "styled-components";
import challengeInfo from "../../styles/createChallenge/challengeInfo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { addDays } from "date-fns";
import { excludeDateIntervals } from "date-fns";
import { ConsoleSqlOutlined } from "@ant-design/icons";
const ChallengeInfo = ({
  setTitle,
  setMethod,
  setDescription,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) => {
  // const disablEvent = [
  //   {

  //   }
  // ]
  /**startDate yyyy-MM-dd형식으로 변경 */
  const onStartDate = (data) => {
    setStartDate(data);
  };
  const onEndDate = (data) => {
    setEndDate(data);
  };
  const dateWeeks = () => {
    let ableNum = startDate;
    let checkEndDate = endDate.getDay();
    if (checkEndDate === 0) {
      checkEndDate = 7;
    }
    for (var i = 1; i <= 76; i += 6) {
      if (checkEndDate - 1 === (ableNum + i).getDay()) {
        continue;
      } else {
        <alert>일주일 단위로 끝나는 날짜를 설정해주세요</alert>;
      }
    }
    // function handlerWeek(startDate) {
    //   {
    //     /**1.해당 요일에 해당되는 숫자를 가져오기 //0 :일 /1:월/ 2:화/3:수/4:목/5:금/6:토 (0-6)*/
    //   }
    //   let dayNum = startDate.getDay();
    //   let selectNum = 0;
    //   if (dayNum === 0) {
    //     dayNum = 7;
    //     selectNum = dayNum - 1;
    //   } else {
    //     selectNum = dayNum - 1;
    //   }
    //   //if daynum === 0 : 해당 숫자를 7로 재할당 그 상태에서 1씩 빼서 요일을 구하기
    //   //else dayNum - 1에 헤당하는 요일 숫자를 가져와서 그 요일만 활성화 되도록
    //   //return 해주면 될듯 젭발,,,,,
    //   return console.log(dayNum - 1);
    // }
    // handlerWeek(startDate);
    // // console.log(endDateString);
    return (
      <>
        <div className="inner">
          <span className="infoSpan">이름</span>
          <input
            className="infoInput"
            onChange={(e) => setTitle(e.target.value)}
            placeholder=" ex) 주 1회 플로깅"
          ></input>
          <span className="infoSpan">인증방법</span>
          <input
            className="infoInput"
            onChange={(e) => setMethod(e.target.value)}
            placeholder=" ex) 쓰레기 봉투 인증"
          ></input>
          <span className="infoSpan">설명</span>

          <textarea
            className="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder=" 조깅을 하면서 쓰레기를 줍는 활동 "
          ></textarea>

          <span className="infoSpan">기간(시작일 ~ 종료일)</span>
          <div className="date">
            <label for="startDate"></label>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={startDate}
              selectsStart
              handlerWeek={startDate}
              onChange={onStartDate}
              locale={ko}
              highlightDates={addDays(new Date(), 7)}
              minDate={new Date()}
            />

            <p className="dateRange">~</p>
            <label for="endDate"></label>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={endDate}
              selectsEnd
              endDate={endDate}
              minDate={startDate}
              maxDate={addDays(startDate, 76)}
              // excludeDateIntervals={
              //   [
              //     // { start: startDate, end: addDays(startDate, 1) },
              //     // { start: startDate, end: addDays(startDate, 2) },
              //     // { start: startDate, end: addDays(startDate, 3) },
              //     // { start: startDate, end: addDays(startDate, 4) },
              //     // { start: startDate, end: addDays(startDate, 5) },
              //     // { start: startDate, end: addDays(startDate, 7) },
              //     // { start: startDate, end: addDays(startDate, 8) },
              //     // { start: startDate, end: addDays(startDate, 9) },
              //     // { start: startDate, end: addDays(startDate, 10) },
              //     // { start: startDate, end: addDays(startDate, 11) },
              //     // { start: startDate, end: addDays(startDate, 13) },
              //     // { start: startDate, end: addDays(startDate, 14) },
              //     // { start: startDate, end: addDays(startDate, 15) },
              //     // { start: startDate, end: addDays(startDate, 16) },
              //     // { start: startDate, end: addDays(startDate, 17) },
              //     // { start: startDate, end: addDays(startDate, 19) },
              //     // { start: startDate, end: addDays(startDate, 20) },
              //     // { start: startDate, end: addDays(startDate, 21) },
              //     // { start: startDate, end: addDays(startDate, 22) },
              //     // { start: startDate, end: addDays(startDate, 23) },
              //     // { start: startDate, end: addDays(startDate, 25) },
              //     // { start: startDate, end: addDays(startDate, 26) },
              //     // { start: startDate, end: addDays(startDate, 27) },
              //     // { start: startDate, end: addDays(startDate, 28) },
              //     // { start: startDate, end: addDays(startDate, 29) },
              //     // { start: startDate, end: addDays(startDate, 31) },
              //     // { start: startDate, end: addDays(startDate, 32) },
              //     // { start: startDate, end: addDays(startDate, 33) },
              //     // { start: startDate, end: addDays(startDate, 34) },
              //     // { start: startDate, end: addDays(startDate, 35) },
              //     // { start: startDate, end: addDays(startDate, 37) },
              //     // { start: startDate, end: addDays(startDate, 38) },
              //     // { start: startDate, end: addDays(startDate, 39) },
              //     // { start: startDate, end: addDays(startDate, 40) },
              //     // { start: startDate, end: addDays(startDate, 41) },
              //     // { start: startDate, end: addDays(startDate, 43) },
              //     // { start: startDate, end: addDays(startDate, 44) },
              //     // { start: startDate, end: addDays(startDate, 45) },
              //     // { start: startDate, end: addDays(startDate, 46) },
              //     // { start: startDate, end: addDays(startDate, 47) },
              //     // { start: startDate, end: addDays(startDate, 49) },
              //     // { start: startDate, end: addDays(startDate, 50) },
              //     // { start: startDate, end: addDays(startDate, 51) },
              //     // { start: startDate, end: addDays(startDate, 52) },
              //     // { start: startDate, end: addDays(startDate, 53) },
              //     // { start: startDate, end: addDays(startDate, 55) },
              //     // { start: startDate, end: addDays(startDate, 56) },
              //     // { start: startDate, end: addDays(startDate, 57) },
              //     // { start: startDate, end: addDays(startDate, 58) },
              //     // { start: startDate, end: addDays(startDate, 59) },
              //     // { start: startDate, end: addDays(startDate, 61) },
              //     // { start: startDate, end: addDays(startDate, 62) },
              //     // { start: startDate, end: addDays(startDate, 63) },
              //     // { start: startDate, end: addDays(startDate, 64) },
              //     // { start: startDate, end: addDays(startDate, 65) },
              //     // { start: startDate, end: addDays(startDate, 67) },
              //     // { start: startDate, end: addDays(startDate, 68) },
              //     // { start: startDate, end: addDays(startDate, 69) },
              //     // { start: startDate, end: addDays(startDate, 70) },
              //     // { start: startDate, end: addDays(startDate, 71) },
              //     // { start: startDate, end: addDays(startDate, 73) },
              //     // { start: startDate, end: addDays(startDate, 74) },
              //     // { start: startDate, end: addDays(startDate, 75) },
              //     // { start: startDate, end: addDays(startDate, 76) },
              //     // { start: startDate, end: addDays(startDate, 77) },
              //   ]
              // }
              onChange={onEndDate}
              locale={ko}
            />
          </div>
        </div>
      </>
    );
  };
};

export default ChallengeInfo;
