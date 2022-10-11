import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Network from "./pages/Network";
import LoginModal from "./components/LoginModal/LoginModal";
import SignUpModal from "./components/signUpModal/SignUpModal";
import MyPage from "./pages/MyPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/network" exact element={<Network />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/signup" element={<SignUpModal />} />
        <Route path="/mypage" element={<MyPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
