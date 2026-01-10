/* eslint-disable react-hooks/exhaustive-deps */
import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyOrder = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [userOrder, setuserOrder] = useState(null);
  
  const getUserOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/myorder`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setuserOrder(res.data.orders);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

    useEffect(() => {
      getUserOrders();
    }, []);

  return <OrderCard userOrder={userOrder} />;
};

export default MyOrder;
