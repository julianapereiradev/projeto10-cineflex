import styled from "styled-components";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";

export default function App() {
  axios.defaults.headers.common["Authorization"] = "nnVzfl2YpmXZSvz5jwJ98zDL";

  return (
    <BrowserRouter>
      <NavContainer>CINEFLEX</NavContainer>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
        <Route path="/assentos" element={<SeatsPage />} />
        <Route path="/sucesso" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
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
