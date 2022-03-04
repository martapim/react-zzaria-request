import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../services/firebase";
import useAuth from "../hooks/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const OrderContext = createContext();

function Order({ children }) {
  const [pizzas, addPizza] = useState([]);
  const [orderInProgress, setOrderInProgress] = useState(false);
  const [phone, addPhone] = useState("");
  const [address, addAddress] = useState({});
  const { userInfo } = useAuth();

  function addPizzaToOrder(pizza) {
    if (orderInProgress) {
      return addPizza((pizzas) => pizzas.concat(newPizza(pizza)));
    }
    setOrderInProgress(true);
    addPizza([newPizza(pizza)]);
  }

  function newPizza(pizza) {
    return { id: uuidv4(), ...pizza };
  }

  function removePizzaFromOrder(id) {
    addPizza((pizzas) => pizzas.filter((p) => p.id !== id));
  }

  async function sendOrder() {
    try {
      const docRef = await addDoc(collection(db, "orders"), {
        userId: userInfo.user.uid,
        createdAt: serverTimestamp(),
        address,
        phone,
        pizzas: pizzas.map((p) => ({
          size: p.pizzaSize,
          flavours: p.pizzaFlavours,
          quantity: p.quantity,
        })),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setOrderInProgress(false);
  }

  return (
    <OrderContext.Provider
      value={{
        order: {
          pizzas,
          address,
          phone,
        },
        addPizzaToOrder,
        sendOrder,
        removePizzaFromOrder,
        addAddress,
        addPhone,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default Order;
