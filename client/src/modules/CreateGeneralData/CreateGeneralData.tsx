import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { GeneralData } from "../../../../server/types";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateGeneralData = Omit<GeneralData, "id">;

import { create } from "zustand";
import client from "../../funcs/trpc";
import useGeneralDataStore from "../../stores/GeneralDataStore";

type Store = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useCreateGeneralDataStore = create<Store>((set) => ({
  isOpen: false,
  onClose: () =>
    set((state) => {
      state.isOpen = false;
      return state;
    }),
  onOpen: () => set(() => ({ isOpen: true })),
}));

function CreateGeneralData() {
  const { data: generalData, setValue } = useGeneralDataStore();
  const { isOpen, onClose } = useCreateGeneralDataStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGeneralData>({});

  const onSubmit: SubmitHandler<CreateGeneralData> = async (
    data: CreateGeneralData
  ) => {
    const res = await client.generalDataRoute.create.mutate({
      balance: +data.balance,
      salary: +data.salary,
      id: generalData.id,
    });

    setValue(res);
    onClose();
    reset();
  };

  return (
    <>
      {/*@ts-ignore */}
      <Modal isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Додати запис</ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {/*@ts-ignore*/}
              <FormControl isInvalid={errors["balance"]}>
                <FormLabel>Баланс</FormLabel>
                <Input
                  {...register("balance", { required: true })}
                  type="number"
                />
              </FormControl>
              {/*@ts-ignore*/}
              <FormControl isInvalid={errors["salary"]}>
                <FormLabel>Зарплата в місяць</FormLabel>
                <Input
                  {...register("salary", { required: true })}
                  type="number"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Додати
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
export { useCreateGeneralDataStore };
export default CreateGeneralData;
