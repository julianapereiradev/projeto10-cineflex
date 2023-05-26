import styled from "styled-components";
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import { useState } from "react";

export default function App() {
  axios.defaults.headers.common["Authorization"] = "nnVzfl2YpmXZSvz5jwJ98zDL";

  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(true);

  function backNavigate() {
    navigate(-1)
  }

  return (
    <>
      <NavContainer>
      {showButton && <button data-test="go-home" onClick={() => backNavigate()}>←</button>}
        
        <p>CINEFLEX</p>
      </NavContainer>
      <Routes>
        <Route path="/" element={<HomePage showButton={showButton} setShowButton={setShowButton} />} />
        <Route path="/sessoes/:idFilme" element={<SessionsPage showButton={showButton} setShowButton={setShowButton} />} />
        <Route path="/assentos/:idSessao" element={<SeatsPage />} />
        <Route path="/sucesso" element={<SuccessPage showButton={showButton} setShowButton={setShowButton} />} />
      </Routes>
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
