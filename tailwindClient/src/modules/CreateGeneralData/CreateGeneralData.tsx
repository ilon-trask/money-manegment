import React from "react";
import { GeneralData } from "../../../../server/types";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateGeneralData = Omit<GeneralData, "id">;

import { create } from "zustand";
import client from "../../lib/trpc";
import useGeneralDataStore from "../../stores/GeneralDataStore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../../ui/Dialog";
import { Button } from "../../ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { Input } from "../../ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
      return { ...state };
    }),
  onOpen: () => set(() => ({ isOpen: true })),
}));

const formScheme = z.object({
  balance: z.string().min(1, { message: "Поле не можу бути пустим" }),
  salary: z.string().min(1, { message: "Поле не можу бути пустим" }),
});

function CreateGeneralData() {
  const { data: generalData, setValue } = useGeneralDataStore();
  const { isOpen, onClose } = useCreateGeneralDataStore();

  const form = useForm<CreateGeneralData>({
    resolver: zodResolver(formScheme),
  });
  const { reset, handleSubmit, control } = form;
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
      <Dialog open={isOpen} modal={true} onOpenChange={() => onClose()}>
        <DialogContent>
          <DialogHeader>Додати запис</DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                name="balance"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Баланс</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Зарплата в місяць</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <DialogFooter className="mt-2">
                <Button className="mr-3" type="submit">
                  Додати
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export { useCreateGeneralDataStore };
export default CreateGeneralData;
