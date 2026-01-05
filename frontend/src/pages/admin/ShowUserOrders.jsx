/* eslint-disable react-hooks/exhaustive-deps */
import OrderCard from "@/components/OrderCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowUserOrders = () => {
  const [userOrder, setuserOrder] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const params = useParams();

  const getUserOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/user-order/${params.userId}`,
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
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <OrderCard userOrder={userOrder} />
    </>
  );
};

export default ShowUserOrders;
