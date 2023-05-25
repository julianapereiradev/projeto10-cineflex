import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SeatsPage() {
  const parametros = useParams();

  console.log("parametro aqui em SeatsPage:", parametros.idSessao);

  const [listSeats, setListSeats] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`;

    const promise = axios.get(URL);

    promise.then((respostaAssentos) => {
      console.log("respostaAssentos.data::", respostaAssentos.data);
      setListSeats(respostaAssentos.data);
    });

    promise.catch((erro) => {
      console.log("erro.response.data de Assentos::", erro.response.data);
    });
  }, []);

  function SelectingSeats(props) {
    console.log(`Você clicou no assento: ${props.id} e ele tem boolean de ${props.isAvailable}`)
  }

  if (listSeats.length === 0) {
    return (
      <div style={{ marginTop: "80px", fontSize: "30px" }}>
        <p>Carregando Assentos...</p>
      </div>
    );
  }

  console.log("listSeats aqui:", listSeats);

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {listSeats.seats.map((seat) => (
          <div key={seat.id}>
            <SeatItem
              key={seat.id}
              colorsituationseat={seat.isAvailable}
              onClick={() => SelectingSeats(seat)}
            >
              {seat.name}
            </SeatItem>
            {/* <p>{seat.isAvailable.toString()}</p> */}
          </div>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircleSelected />
          Selecionado
        </CaptionItem>

        <CaptionItem>
          <CaptionCircleAvailable />
          Disponível
        </CaptionItem>

        <CaptionItem>
          <CaptionCircleUnavailable />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer>
        Nome do Comprador:
        <input placeholder="Digite seu nome..." />
        CPF do Comprador:
        <input placeholder="Digite seu CPF..." />
        <Link
          to="/sucesso"
          style={{
            textDecoration: "none",
            alignSelf: "center",
          }}
        >
          <button>Reservar Assento(s)</button>
        </Link>
      </FormContainer>
      <FooterContainer>
        <div>
          <img src={listSeats.movie.posterURL} alt="poster" />
        </div>
        <div>
          <p>{listSeats.movie.title}</p>
          <p>
            {listSeats.day.weekday} - {listSeats.name}
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;

const CaptionCircleSelected = styled.div`
  border: 1px solid #0e7d71;
  background-color: #1aae9e;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;

const CaptionCircleAvailable = styled.div`
  border: 1px solid #7b8b99;
  background-color: #c3cfd9;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;

const CaptionCircleUnavailable = styled.div`
  border: 1px solid #f7c52b;
  background-color: #fbe192;
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;

const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid
    ${(props) => (props.colorsituationseat === true ? "#7B8B99" : "#F7C52B")}; // Essa cor deve mudar
  background-color: ${(props) =>
    props.colorsituationseat === true
      ? "#C3CFD9"
      : "#FBE192"}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
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
