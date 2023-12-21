import React from "react";
import { H3, Card, Text } from "../../ui";
import useLocalId from "./funcs/useLocalId";
import { useEffect } from "react";
import CreateGeneralData, {
  useCreateGeneralDataStore,
} from "../CreateGeneralData/CreateGeneralData";
import useGeneralDataStore from "../../stores/GeneralDataStore";
import getGeneralData from "./funcs/getGeneralData";
import useComfortNumber from "../../funcs/useComfortNumber";
import { Button } from "../../ui/Button";

function MainValues({ className }: { className: string }) {
  useEffect(() => {
    (async () => {
      const generalDataId = await useLocalId();
      const generalData = await getGeneralData(generalDataId);
      if (generalData) {
        setValue(generalData);
      } else {
        setValue({ id: generalDataId, balance: 0, salary: 0 });
        onOpen();
      }
    })();
  }, []);

  const { onOpen } = useCreateGeneralDataStore();
  const { data: generalData, setValue } = useGeneralDataStore();

  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <Card>
        <H3>Поточний баланс</H3>
        <Text className="inline-block mr-1 mt-8 font-semibold text-4xl">
          {useComfortNumber(generalData?.balance)}
        </Text>
        <span className="text-2xl">грн.</span>
      </Card>
      {/* <Card>
        <H3>За останній місяць</H3>
        <Text mr={"4px"} mt={"60px"} fontWeight={"bold"} fontSize={"40px"}>
          +2%
        </Text>
      </Card> */}
      <Card cursor={"pointer"}>
        <H3>Поточна зарплата</H3>
        <Text className="inline-block mr-1 mt-8 font-semibold text-4xl">
          {useComfortNumber(generalData?.salary)}
        </Text>
        <span className="text-2xl">грн./міс.</span>
      </Card>
      <CreateGeneralData />
    </div>
  );
}

export default MainValues;
