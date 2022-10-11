import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import Network from "./pages/Network";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/network" exact element={<Network />} />
        <Route path="/mypage" element={<MyPage/>}/>
      </Routes>
    </Router>
  );

}



export default App;
