"use client";

import React, { useEffect } from "react";
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
import { updateOrder } from "../action/Action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type TDetailsProps = {
  _id: string;
  name: string;
  date: string;
  status: string;
};

export default function OrderModalShow({
  details,
}: {
  details: TDetailsProps;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const id = details?._id;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Update the form values when details change
    setValue("name", details?.name);
    setValue("date", details?.date);
    setValue("status", details?.status);
  }, [details, setValue]);

  const onSubmit = async (data: FieldValues) => {
    const { name, date, status } = data;
    const options = {
      id: id,
      data: {
        name,
        date,
        status,
      },
    };

    const res = await updateOrder(options);
    await onClose();

    if (res.success) {
      toast.success("Updated Successfully");
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Show</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Order Details
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
                        defaultValue={details?.name}
                        {...register("name", { required: false })}
                      />
                    </div>
                    <div className="mb-5">
                      <Input
                        label="Date"
                        placeholder="date"
                        type="date"
                        color="primary"
                        variant="bordered"
                        defaultValue={details?.date}
                        {...register("date", { required: false })}
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
                      placeholder="Select Status"
                      {...register("status", { required: true })}
                      defaultSelectedKeys={details?.status}
                    >
                      <SelectItem key="initialize">initialize</SelectItem>
                      <SelectItem key="pending">pending</SelectItem>
                      <SelectItem key="delevered">delevered</SelectItem>
                    </Select>
                    {errors.status && (
                      <span className="text-red-500">Status is required</span>
                    )}
                    <ModalFooter>
                      <Button type="submit" color="primary">
                        Update
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
