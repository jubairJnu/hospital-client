"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { addItemToOrder, getItems } from "../action/Action";
import { toast } from "sonner";

export type TItem = {
  _id: string;
  title: string;
  price: number;
  itemId: string;
};

type TItemProps = {
  _id: string;
  title: string;
  price: number;
  itemId: TItem;
};

const Item = ({ orderItems, id }: { orderItems: TItemProps[]; id: string }) => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const items = await getItems();

        const filtered = items?.data?.filter(
          (item: { _id: string }) =>
            !orderItems.some((orderItem) => orderItem.itemId._id === item._id)
        );

        setFilteredItems(filtered);
      };

      fetchData();
    }
  }, [orderItems, id]);

  //  halndle add item

  const handleAddItem = async (itemId: string) => {
    const options = {
      id,
      data: {
        itemId,
      },
    };

    const res = await addItemToOrder(options);

    if (res.success) {
      toast.success("Item Added Successfully");
    }

    toast.error(`${res.message}`);
  };

  return (
    <div>
      <Table aria-label="Filtered items table">
        <TableHeader>
          <TableColumn>Test ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent="No data ">
          {filteredItems?.map((item: TItem) => (
            <TableRow key={item._id}>
              <TableCell>{item.itemId}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleAddItem(item._id)}
                  className="text-red-500"
                >
                  Add
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Item;
