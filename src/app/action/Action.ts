"use server";

interface SearchParams {
  searchTerm: string;
}

type TOptionsProps = {
  id: string;
  data: FieldValues;
};

type Tparams = {
  page: number;
};

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getOrders = async (params: Tparams) => {
  const response = await fetch(
    `https://hospital-server-weld.vercel.app/order?page=${params.page}`,
    {
      next: {
        tags: ["orders"],
      },
    }
  );

  const orders = await response.json();
  return orders; // Adjust according to your data structure
};

export const createOrder = async (data: FieldValues) => {
  const res = await fetch("https://hospital-server-weld.vercel.app/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  await revalidateTag("orders");

  const orderInfo = await res.json();

  return orderInfo;
};

//  update order

export const updateOrder = async (options: TOptionsProps) => {
  const response = await fetch(
    `https://hospital-server-weld.vercel.app/order/update/${options.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
    }
  );
  revalidateTag("orders");
  const res = await response.json();
  return res;
};

// serach order

export const getOrdersBySearch = async ({ searchTerm }: SearchParams) => {
  console.log("params", searchTerm);
  const response = await fetch(
    `https://hospital-server-weld.vercel.app/order?searchTerm=${searchTerm}`,
    {
      next: {
        tags: ["order"],
      },
    }
  );

  const orders = await response.json();
  return orders; // Adjust according to your data structure
};

export const getItems = async () => {
  const response = await fetch("https://hospital-server-weld.vercel.app/item", {
    next: {
      tags: ["items"],
    },
  });

  const items = await response.json();
  return items; // Adjust according to your data structure
};

//  add item

export const addItemToOrder = async (options: TOptionsProps) => {
  const response = await fetch(
    `https://hospital-server-weld.vercel.app/order/${options.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options.data),
    }
  );
  revalidateTag("order");

  const res = await response.json();
  return res;
};
