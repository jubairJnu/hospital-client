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
import { createOrder } from "../action/Action";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";

export default function AddOrderModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const { name, date, status } = data;
    const orderinfo = {
      name,
      date,
      status,
    };

    const res = await createOrder(orderinfo);

    if (res.success) {
      toast.success("Order Created Successfully");
      await onClose();

      reset();
    }
  };

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
                    <div className="mb-5">
                      <Input
                        label="Name"
                        placeholder="Name"
                        color="primary"
                        variant="bordered"
                        {...register("name", { required: true })}
                      />

                      {errors.name && (
                        <span className="text-red-500">Name is required</span>
                      )}
                    </div>
                    <div className="mb-5">
                      <Input
                        label="Date"
                        placeholder="date"
                        type="date"
                        color="primary"
                        variant="bordered"
                        {...register("date", { required: true })}
                      />
                      {errors.date && (
                        <span className="text-red-500">Date is required</span>
                      )}
                    </div>
                    .
                    <Select
                      label="Select Status"
                      color="primary"
                      variant="bordered"
                      className=""
                      {...register("status", { required: true })}
                    >
                      <SelectItem key="Initialize">Initialize</SelectItem>
                      <SelectItem key="pending">pending</SelectItem>
                      <SelectItem key="Delevered">Delevered</SelectItem>
                    </Select>
                    {errors.status && (
                      <span className="text-red-500">Status is required</span>
                    )}
                    <ModalFooter>
                      <Button type="submit" color="primary">
                        Add
                      </Button>
                    </ModalFooter>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
