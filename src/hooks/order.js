import { useContext } from "react";
import { OrderContext } from "../contexts/order";

function useOrder() {
  return useContext(OrderContext);
}

export default useOrder;
