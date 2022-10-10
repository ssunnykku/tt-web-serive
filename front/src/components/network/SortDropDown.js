import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
const SortDropDown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        최신순
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">최신순</Dropdown.Item>
        <Dropdown.Item href="#/action-2">참여인원순</Dropdown.Item>
        <Dropdown.Item href="#/action-3">진행중인 챌린지</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropDown;
