import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
const CheckDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        1주차~4주차
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>5~8주차</Dropdown.Item>
        <Dropdown.Item>9~12주차</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CheckDropdown;
