import React, { useState } from "react";
import NavBar from "../components/NavBar";
import data from "../components/network/data";
import SearchForm from "../components/network/SearchForm";
import SortDropDown from "../components/network/SortDropDown";
import NetworkCard from "../components/NetworkCard";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/network/network.css";
import StyledButton from "../styles/commonstyles/Button";
const Network = () => {
  const originalData = data;
  const [ChallangeList, setChallangeList] = useState(data);
  const [visible, setVisible] = useState(4);
  const showMoreCards = () => {
    setVisible((preValue) => preValue + 4);
  };

  return (
    <div className="NetworkContainer">
      <NavBar />
      <div className="SearchFormContainer">
        <SearchForm
          originalData={originalData}
          data={ChallangeList}
          setData={setChallangeList}
        />
        <SortDropDown originalData={originalData} data={ChallangeList} setData={setChallangeList} />
      </div>
      <div className="challangePostButtonContainer">
      <button className="challangePostButton">+</button>
      </div>
      <Container>
        <Row>
          {ChallangeList.slice(0, visible).map((menu) => (
            <Col lg={3}>
              <NetworkCard item={menu} />
            </Col>
          ))}
        </Row>
        {visible < ChallangeList.length ? (
          <StyledButton
            id="showMore-btn"
            className="mt-3 mb-5"
            onClick={showMoreCards}
          >
            더보기
          </StyledButton>
        ) : null}
      </Container>
    </div>
  );
};

export default Network;
