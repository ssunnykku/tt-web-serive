import React, { useState, useEffect, useReducer, createContext } from "react";
import FullpageContainer from "./styles/mainpage/FullPageContainer";
import MainPage1 from "./pages/MainPage1";
import MainPage2 from "./pages/MainPage2";
import MainPage3 from "./pages/MainPage3";
function App() {
  return (
    <FullpageContainer>
      <div className="container">
        <MainPage1/>
        <MainPage2/>
        <MainPage3/>
      </div>
    </FullpageContainer>
  );
}

export default App;
