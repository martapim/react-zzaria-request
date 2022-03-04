import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Button, Input as MaterialInput } from "@material-ui/core";
import { Content, HeaderContent, Title, Footer } from "../../ui";
import { HOME, CHECKOUT } from "../../routes";
import useOrder from "../../hooks/order";
import { Link } from "react-router-dom";

const ChoosePizzaQuantity = ({ location }) => {
  const [quantity, setQuantity] = useState(1);
  const { addPizzaToOrder } = useOrder();

  if (!location.state) {
    return <Redirect to={HOME} />;
  }

  function handleChange(e) {
    const { value } = e.target;
    if (value >= 1) {
      setQuantity(value);
    }
  }

  function addPizza() {
    addPizzaToOrder({
      ...location.state,
      quantity,
    });
  }

  return (
    <>
      <Content>
        <HeaderContent>
          <Title variant="h4">
            Quantas pizzas você gostaria
            <br />
            de pedir, com esses sabores?
          </Title>
        </HeaderContent>
        <MainContent>
          <Input value={quantity} onChange={handleChange} autoFocus />
          <ButtonAddPizza to={HOME} onClick={addPizza}>
            Adicionar e <br /> montar outra
          </ButtonAddPizza>
        </MainContent>
      </Content>
      <Footer
        buttons={{
          back: { children: "Mudar sabores" },
          action: {
            to: CHECKOUT,
            onClick: addPizza,
            children: "Finalizar compra",
            color: "primary",
          },
        }}
      />
    </>
  );
};

const Input = styled(MaterialInput).attrs({ type: "number" })`
  && {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }

  & input {
    font-size: 80px;
    padding: 10px;
    text-align: center;
    width: 150px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

const ButtonAddPizza = styled(Button).attrs({
  variant: "contained",
  color: "secondary",
  component: Link,
})`
  text-align: center;
`;

export default ChoosePizzaQuantity;
