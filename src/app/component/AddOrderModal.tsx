import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FieldValues, useForm } from "react-hook-form";

export default function AddOrderModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <>
      <Button className="bg-blue-500 text-white" onPress={onOpen}>
        New Order
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Order
              </ModalHeader>
              <ModalBody>
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                      label="Name"
                      placeholder="Name"
                      color="primary"
                      variant="bordered"
                      className="mb-5"
                      {...register("name", { required: true })}
                    />
                    <Input
                      label="Date"
                      placeholder="date"
                      type="date"
                      color="primary"
                      variant="bordered"
                      className="mb-5"
                      {...register("date", { required: true })}
                    />

                    <Select
                      label="Select Status"
                      color="primary"
                      variant="bordered"
                      className=""
                    >
                      <SelectItem key="Initialize">Initialize</SelectItem>
                      <SelectItem key="pending">pending</SelectItem>
                      <SelectItem key="Delevered">Delevered</SelectItem>
                    </Select>
                  </form>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary">Add</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
