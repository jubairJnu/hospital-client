"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import OrderModalShow from "./OrderShowModal";
import AddOrderModal from "./AddOrderModal";

const Order = ({ items }) => {
  const [page, setPage] = useState(1);

  const pages = items?.data?.meta?.page;

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const renderCell = useCallback((order: any, columnKey: any) => {
    const cellValue = order[columnKey as keyof typeof order];

    switch (columnKey) {
      case "orderId":
        return cellValue;
      case "action":
        return (
          //
          <div className="flex justify-center gap-5">
            <OrderModalShow />
            <Button className="bg-blue-500 text-white ">Report</Button>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);
  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center ">
        <Pagination
          isCompact
          showControls
          showShadow
          
          page={page}
          total={items?.data?.meta?.totalpage}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            // isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            // isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, onNextPage, onPreviousPage]);

  return (
    <div>
      {/* button of modal */}
      <AddOrderModal />
      {/* table */}

      <Table
        isStriped
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-screen  m-5",
        }}
      >
        <TableHeader>
          <TableColumn
            className="bg-blue-500 text-white text-center "
            key="orderId"
          >
            OrderId
          </TableColumn>
          <TableColumn
            className="bg-blue-500 text-white text-center "
            key="name"
          >
            Name
          </TableColumn>
          <TableColumn
            className="bg-blue-500 text-white text-center "
            key="date"
          >
            Date
          </TableColumn>
          <TableColumn
            className="bg-blue-500 text-white text-center "
            key="status"
          >
            Status
          </TableColumn>
          <TableColumn
            className="bg-blue-500 text-white text-center "
            key="action"
          >
            Action
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No exams found"} items={items?.data?.result}>
          {(item: any) => (
            <TableRow className="text-center" key={item._id}>
              {(columnKey) => (
                <TableCell className="text-center">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Order;
