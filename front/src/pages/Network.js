import React, { useState } from "react";
import NavBar from "../components/NavBar";
import data from "../components/network/data";
import SearchForm from "../components/network/SearchForm";
import SortDropDown from "../components/network/SortDropDown";
import NetworkCard from "../components/NetworkCard";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/network/network.css";
import StyledButton from "../styles/commonstyles/Button";
import CreateChallengePage from "./CreateChallengePage";
import { useNavigate } from "react-router-dom";


const Network = () => {
  const navigate=useNavigate()
  const originalData = data;
  const [ChallangeList, setChallangeList] = useState(data);
  const [visible, setVisible] = useState(4);
  const showMoreCards = () => {
    setVisible((preValue) => preValue + 4);
  };
  const click = () => {
    document.location.href("/CreateChallengePage");
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
        <SortDropDown
          originalData={originalData}
          data={ChallangeList}
          setData={setChallangeList}
        />
      </div>
      <div className="challangePostButtonContainer">
        
          <button className="challangePostButton"
          onClick={()=>{
            navigate('/network/pages/CreateChallengePage')
          }}>+</button>
        
      </div>
      <Container className="forContainer">
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
