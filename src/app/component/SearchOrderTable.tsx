"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Item from "./Item";
import { TItems } from "../types/Index";
type TOrderItem = {
  itemId: {
    itemId: string; // Assuming 'itemId' is a string, adjust if needed
    _id: string;
    price: number;
    title: string;
  };
  // Add other properties if needed
};

type TOrder = {
  _id: string;

  date: string;
  name: string;
  orderId: string;
  orderItem: TOrderItem[];
  status: string;
};

type Props = {
  data: TOrder[];
};

const SearchOrderTable: React.FC<Props> = ({ data }) => {
  const orderItems: any = data.flatMap((order) => order.orderItem);
  return (
    <div className="mt-5 flex  items-start gap-5">
      <div className="w-1/2">
        <Table aria-label="Order details table" color="primary">
          <TableHeader>
            <TableColumn>Test ID</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody emptyContent="No data ">
            {data.flatMap((item) =>
              item.orderItem.map((order) => (
                <TableRow key={order.itemId._id}>
                  <TableCell>{order.itemId.itemId}</TableCell>
                  <TableCell>{order.itemId.title}</TableCell>
                  <TableCell>{order.itemId.price}</TableCell>
                  <TableCell>
                    <button className="text-red-500">Delete</button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-1/2">
        <Item id={data[0]?._id} orderItems={orderItems} />
      </div>
    </div>
  );
};

export default SearchOrderTable;
