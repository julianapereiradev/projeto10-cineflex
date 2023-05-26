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
    navigate(-1);
  }

  return (
    <>
      <NavContainer>
        {showButton && (
          <button data-test="go-home-header-btn" onClick={() => backNavigate()}>
            <img src="https://cdn.icon-icons.com/icons2/2596/PNG/512/arrow_left_icon_155794.png"/>
          </button>
        )}

        <p>CINEFLEX</p>
      </NavContainer>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage showButton={showButton} setShowButton={setShowButton} />
          }
        />
        <Route
          path="/sessoes/:idFilme"
          element={
            <SessionsPage
              showButton={showButton}
              setShowButton={setShowButton}
            />
          }
        />
        <Route path="/assentos/:idSessao" element={<SeatsPage />} />
        <Route
          path="/sucesso"
          element={
            <SuccessPage
              showButton={showButton}
              setShowButton={setShowButton}
            />
          }
        />
      </Routes>
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  button {
    margin-left: 10px;
    background-color: #c3cfd9;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    height: 43px;
    width: 55.08px;
    font-size: 50px;
    color: black;
img{
  height: 43px;
    width: 55.08px;
}
  }
  p {
    text-align: center;
    flex-grow: 1;
  }
`;
