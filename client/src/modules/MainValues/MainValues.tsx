import { Grid, Text, BoxProps } from "@chakra-ui/react";
import { H3, Card } from "../../ui";
import useLocalId from "./funcs/useLocalId";
import { useEffect } from "react";
import CreateGeneralData, {
  useCreateGeneralDataStore,
} from "../CreateGeneralData/CreateGeneralData";
import useGeneralDataStore from "../../stores/GeneralDataStore";
import getGeneralData from "./funcs/getGeneralData";
import useComfortNumber from "../../funcs/useComfortNumber";

function MainValues(props: BoxProps) {
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
    <Grid templateColumns={"repeat(2,1fr)"} gap={"20px"} {...props}>
      <Card cursor={"pointer"}>
        <H3>Поточний баланс</H3>
        <Text
          display={"inline-block"}
          mr={"4px"}
          mt={"60px"}
          fontWeight={"bold"}
          fontSize={"40px"}
        >
          {useComfortNumber(generalData?.balance)}
        </Text>
        <Text as={"span"}>грн.</Text>
      </Card>
      {/* <Card>
        <H3>За останній місяць</H3>
        <Text mr={"4px"} mt={"60px"} fontWeight={"bold"} fontSize={"40px"}>
          +2%
        </Text>
      </Card> */}
      <Card cursor={"pointer"}>
        <H3>Поточна зарплата</H3>
        <Text
          display={"inline-block"}
          mr={"4px"}
          mt={"60px"}
          fontWeight={"bold"}
          fontSize={"40px"}
        >
          {useComfortNumber(generalData?.salary)}
        </Text>
        <Text as={"span"}>грн./міс.</Text>
      </Card>
      <CreateGeneralData />
    </Grid>
  );
}

export default MainValues;
