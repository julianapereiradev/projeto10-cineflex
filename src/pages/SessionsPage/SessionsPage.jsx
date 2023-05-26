import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";

export default function SessionsPage(props) {

  const {showButton, setShowButton} = props

  const parametros = useParams();

  // console.log("parametro aqui em SessionsPage:", parametros.idFilme);

  const [listSessions, setListSessions] = useState([]);

  useEffect(() => {
    const URL =
      `https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`;

    const promise = axios.get(URL);

    promise.then((respostaSessao) => {
      console.log("respostaSessao.data::", respostaSessao.data);
      setListSessions(respostaSessao.data);
    });

    promise.catch((erro) => {
      console.log("erro.response.data de Sessoes::", erro.response.data);
    });
  }, []);

  if(showButton === false) {
    setShowButton(true)
  }

  if (listSessions.length === 0) {
    return (
      <div style={{ marginTop: "80px", fontSize: "30px" }}>
        <p>Carregando Sessões...</p>
      </div>
    );
  }

  return (
    <PageContainer>
      Selecione o horário
      <div>
        {listSessions.days.map((day) => (
          <SessionContainer data-test="movie-day" key={day.id}>
            {day.weekday} - {day.date}
            <ButtonsContainer>
              {day.showtimes.map((showtime) => (
                <Link to={`/assentos/${showtime.id}`} key={showtime.id}>
                  <button data-test="showtime">{showtime.name}</button>
                </Link>
              ))}
            </ButtonsContainer>
          </SessionContainer>
        ))}
      </div>
      <FooterContainer data-test="footer">
        <div>
          <img src={listSessions.posterURL} alt="poster" />
        </div>
        <div>
          <p>{listSessions.title}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
