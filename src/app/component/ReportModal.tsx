import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { TOrderItem } from "../types/Index";


type TOederDetailsProps = {
  orderItem: TOrderItem[];
  orderId: string;
  name: string;
  status: string;
  date: string;
};

// styele

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },

  textLine: {
    marginVertical: 10,
  },

  table: {
    width: "100%",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    maxWidth: "100%",
    gap: "5px",
  },
  tableCell: {
    display: "flex",

    width: "100%",

    padding: 8,
    textAlign: "center",
    minWidth: 100,
  },
  tableHeader: {
    fontWeight: "bold",
    color: "#0476D0",
  },
});

export default function ReportModal({
  orderDetail,
}: {
  orderDetail: TOederDetailsProps;
}) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Report</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Order Report
              </ModalHeader>
              <ModalBody className="max-h-96 ">
                <PDFViewer width="100%" height="600">
                  <Document>
                    <Page size="A4" style={styles.page}>
                      <View style={styles.section}>
                        <Text style={styles.textLine}>
                          Order ID: {orderDetail?.orderId}
                        </Text>
                        <Text style={styles.textLine}>
                          Name: {orderDetail?.name}
                        </Text>
                        <Text style={styles.textLine}>
                          Date: {orderDetail?.date}
                        </Text>
                        <Text style={styles.textLine}>
                          Status: {orderDetail?.status}
                        </Text>
                      </View>

                      <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Item ID</Text>
                          </View>
                          <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Title</Text>
                          </View>
                          <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Price</Text>
                          </View>
                        </View>
                        {orderDetail?.orderItem?.map((item) => (
                          <View
                            key={item?.itemId?.itemId}
                            style={styles.tableRow}
                          >
                            <View style={styles.tableCell}>
                              <Text>{item.itemId?.itemId}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text>{item?.itemId?.title}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text>{item?.itemId?.price}</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </Page>
                  </Document>
                </PDFViewer>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
