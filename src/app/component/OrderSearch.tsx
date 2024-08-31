/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useCallback } from "react";
import { GetServerSideProps } from "next";
import { getOrdersBySearch } from "../action/Action";

import { debounce } from "./Debounce";
import { Input } from "@nextui-org/react";
import SearchOrderTable from "./SearchOrderTable";
import { TItems } from "../types/Index";
import { toast } from "sonner";

const defaultOrders: Partial<TItems> = {
  data: {
    meta: {
      total: 0,
      page: 1,
      totalPage: 1,
      limit: 10,
    },
    result: [],
  },
};

const OrderSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [orders, setOrders] = useState<TItems>(defaultOrders as TItems);
  const [isLoading, setisLoading] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debounceSearch(event.target.value);
  };

  const fetchOrders = async (search: string) => {
    setisLoading(true); // Set loading to true before fetching data
    toast.loading("Loading..."); // Show loading toast
    try {
      if (search) {
        const orders = await getOrdersBySearch({ searchTerm: search });
        setOrders(orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setisLoading(false); // Set loading to false after data is fetched
      toast.dismiss(); // Clear loading toast
    }
  };

  // Memoize the debounced function to avoid recreating it on each render
  const debounceSearch = useCallback(debounce(fetchOrders, 700), []);

  return (
    <div className="pb-20">
      <Input
        label="Search"
        isClearable
        radius="lg"
        onChange={handleSearchChange}
        color="primary"
        variant="bordered"
        className="max-w-xs"
        placeholder="Search by orderId.."
      />

      <SearchOrderTable data={orders?.data?.result} />
    </div>
  );
};

// Server-side rendering function
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Extract searchTerm from query and ensure it is a string
  const searchTerm = Array.isArray(context.query.searchTerm)
    ? context.query.searchTerm[0] // Take the first item if it's an array
    : context.query.searchTerm || ""; // Default to an empty string if undefined

  // Fetch initial orders based on searchTerm
  const initialOrders = await getOrdersBySearch({ searchTerm });

  return {
    props: {
      initialOrders,
    },
  };
};

export default OrderSearch;
