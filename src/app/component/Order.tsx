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
  Spinner,
} from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import OrderModalShow from "./OrderShowModal";
import AddOrderModal from "./AddOrderModal";
import { TItems } from "../types/Index";
import axios from "axios";
import { getOrders } from "../action/Action";
import ReportModal from "./ReportModal";
import { toast } from "sonner";

interface OrderProps {
  items: TItems; // Assuming TItems is the correct type for items
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Order = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  const [page, setPage] = useState(1);

  // Initialize orders with an empty structure that matches TItems
  const [orders, setOrders] = useState<TItems>({
    data: {
      result: [],
      meta: {
        totalPage: 1,
        page: 1,
        total: 1,
        limit: 10,
      },
    },
  });

  useEffect(() => {
    const fetchOrders = async () => {
      toast.loading("Loading...");
      const fetchedOrders = await getOrders({ page });
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, [page]);

  const handleViewPDF = async (id: string) => {
    console.log("id", id);
    try {
      // Fetch PDF data
      const response = await axios.get(
        `https://hospital-server-weld.vercel.app/order/pdf/${id}`,
        {
          responseType: "blob",
        }
      );

      // Create a new URL for the PDF Blob
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `order_${id}.pdf`); // Set the file name
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  const pages = orders?.data?.meta?.totalPage;
  console.log(pages);

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
            <OrderModalShow details={order} />
            <ReportModal orderDetail={order} />

            <Button
              onClick={() => handleViewPDF(order._id)}
              className="bg-blue-500 text-white "
            >
              Download
            </Button>
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
          total={orders?.data?.meta?.totalPage}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={page === orders?.data?.meta?.totalPage}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    page,
    setPage,
    onNextPage,
    onPreviousPage,
    orders?.data?.meta?.totalPage,
  ]);

  return (
    <div>
      {/* button of modal */}
      <AddOrderModal />
      {/* table */}

      <Table
        aria-label="Order Table"
        isStriped
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-screen  mt-5",
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
        <TableBody
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={"No order  found"}
          items={orders?.data?.result}
        >
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
