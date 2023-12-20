import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Record } from "../../../../../../server/types";
import useRecordStore from "../../../../stores/RecordStore";
import useGeneralDataStore from "../../../../stores/GeneralDataStore";
import useCreateRecord from "./funcs/useCreateRecord";

export type CreateRecordType = Omit<
  Record,
  "generalDataId" | "createdAt" | "id" | "balance"
>;

function CreateRecord() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { add } = useRecordStore();
  const { data: generalData, changeBalanceOnCreateRecord } =
    useGeneralDataStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateRecordType>({});

  const onSubmit: SubmitHandler<CreateRecordType> = (
    createRecordData: CreateRecordType
  ) => {
    onClose();
    reset();
    (async () => {
      const recordData = await useCreateRecord(createRecordData, generalData);
      changeBalanceOnCreateRecord(recordData);
      add(recordData);
    })();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Додати
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Додати запис</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              {/*@ts-ignore*/}
              <FormControl isInvalid={errors["name"]}>
                <FormLabel>Назва</FormLabel>
                <Input {...register("name", { required: true })} />
              </FormControl>
              {/*@ts-ignore*/}
              <FormControl isInvalid={errors["sum"]}>
                <FormLabel>Сума</FormLabel>
                <Input {...register("sum", { required: true })} type="number" />
              </FormControl>
              {/*@ts-ignore*/}
              <FormControl isInvalid={errors["name"]}>
                <FormLabel>Тип</FormLabel>
                <Select {...register("type", { required: true })}>
                  <option value="" defaultChecked hidden></option>
                  <option value="minus">Витрата</option>
                  <option value="plus">Заробіток</option>
                </Select>
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

export default CreateRecord;
