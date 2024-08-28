"use server";

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getOrders = async () => {
  const response = await fetch("http://localhost:5000/order", {
    next: {
      tags: ["orders"],
    },
  });

  const orders = await response.json();
  return orders; // Adjust according to your data structure
};

export const createOrder = async (data: FieldValues) => {
  const res = await fetch("http://localhost:5000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateTag("orders");

  const orderInfo = await res.json();

  return orderInfo;
};
