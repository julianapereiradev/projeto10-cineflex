import styled from "styled-components";
import { useState } from "react";

export default function SeatPage(props) {

  const {
    id,
    seatName,
    isAvailable,
    pickedSeats,
    setPickedSeats,
    pickedSeatsName,
    setPickedSeatsName,
  } = props;

  const [isSelected, setIsSelected] = useState(false);

  function selectingSeats() {

    if (isAvailable === false) {
      alert("Esse assento não está disponível");
      return;

    } else {
      setIsSelected(!isSelected);

      if (!isSelected === true && !pickedSeats.includes(id)) {
        setPickedSeats([...pickedSeats, id]);
        setPickedSeatsName([...pickedSeatsName, seatName])
      }
      if (!isSelected === false && pickedSeats.includes(id)) {
        setPickedSeats([...pickedSeats].filter((idsInPickedSeats) => {
            if(idsInPickedSeats !== id) {
                return true
            } else {
                return false
            }
        }));

        setPickedSeatsName([...pickedSeatsName].filter((namesInPickedSeats) => {
          if(namesInPickedSeats !== seatName) {
              return true
          } else {
              return false
          }
      }));
      }
    }
  }

  return (
    <SeatItem
      isAvailable={isAvailable}
      isSelected={isSelected}
      onClick={() => selectingSeats()}
      borderColor={isAvailable}
    >
      {seatName}
    </SeatItem>
  );
}

const SeatItem = styled.div`
  border: 1px solid
    ${(props) => (props.isAvailable === true ? "#7B8B99" : "#F7C52B")};
  background-color: ${(props) =>
    props.isAvailable === true ? "#C3CFD9" : "#FBE192"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  background-color: ${(props) =>
    props.isSelected === true ? "#1AAE9E" : ""};
  border: 1px solid
    ${(props) => (props.isSelected === true ? "#0E7D71" : "nada")};
`;
