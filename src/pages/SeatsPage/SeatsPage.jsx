import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatPage from "./SeatPage";

export default function SeatsPage() {
  const parametros = useParams();

  // console.log("parametro aqui em SeatsPage:", parametros.idSessao);

  const navigate = useNavigate();
  const [listSeats, setListSeats] = useState([]);
  const [pickedSeats, setPickedSeats] = useState([]);
  const [pickedSeatsName, setPickedSeatsName] = useState([]);
  const [nomeComprador, setNomeComprador] = useState("");
  const [cpf, setCpf] = useState("");
  const [redirectData, setRedirectData] = useState(null);

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`;

    const promise = axios.get(URL);

    promise.then((seatsAnswer) => {
      setListSeats(seatsAnswer.data);
    });

    promise.catch((erro) => {
      console.log("erro.response.data de Assentos::", erro.response.data);
    });
  }, []);

  if (listSeats.length === 0) {
    return (
      <div style={{ marginTop: "80px", fontSize: "30px" }}>
        <p>Carregando Assentos...</p>
      </div>
    );
  }

  function FinishReservation(e) {
    e.preventDefault()

    const mensagemAEnviar = {
      ids: pickedSeats,
      name: nomeComprador,
      cpf: cpf,
    };

    const promiseEnviarMensagem = axios.post(
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
      mensagemAEnviar
    );
    promiseEnviarMensagem.then(sucessoNaMsgEnviada);
    promiseEnviarMensagem.catch(erroNaMsgEnviada);

    function sucessoNaMsgEnviada(respostaSucessoMsgEnviada) {
      console.log("respostaSucessoMsgEnviada aqui:", respostaSucessoMsgEnviada);

      setRedirectData({
        mensagemAEnviar: mensagemAEnviar,
        seatsData: listSeats,
      });

      navigate("/sucesso", {
        state: {
          mensagemAEnviar: mensagemAEnviar,
          seatsData: listSeats,
          pickedSeatsName: pickedSeatsName,
        },
      });
    }

    function erroNaMsgEnviada(respostaEntradaErroMesgEnviada) {
      console.log(
        "respostaEntradaErroMesgEnviada aqui:",
        respostaEntradaErroMesgEnviada
      );
    }
  }

  console.log('pickedseats aqui::',pickedSeats)

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {listSeats.seats.map((seat) => (
          <SeatPage
            key={seat.id}
            id={seat.id}
            seatName={seat.name}
            isAvailable={seat.isAvailable}
            pickedSeats={pickedSeats}
            setPickedSeats={setPickedSeats}
            pickedSeatsName={pickedSeatsName}
            setPickedSeatsName={setPickedSeatsName}
          />
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

      <FormContainer onSubmit={FinishReservation}>
        <Title htmlFor="nameclient">Nome do Comprador:</Title>
        <input
          type="text"
          required
          id="nameclient"
          data-test="client-name"
          placeholder="Digite seu nome..."
          value={nomeComprador}
          onChange={(event) => setNomeComprador(event.target.value)}
        />
        <Title htmlFor="cpfClient">CPF do Comprador:</Title>
        <input
          type="text"
          required
          id="cpfClient"
          data-test="client-cpf"
          placeholder="Digite seu CPF..."
          value={cpf}
          onChange={(event) => setCpf(event.target.value)}
        />
       
          <button data-test="book-seat-btn" type="submit">
            Reservar Assento(s)
          </button>
       
      </FormContainer>

      <FooterContainer data-test="footer">
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
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
    cursor: pointer;
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

const Title = styled.label`
  //
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
