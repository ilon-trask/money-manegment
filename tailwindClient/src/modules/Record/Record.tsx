import Filter from "../../assets/filter.svg";
import Sort from "../../assets/sort.svg";
import { Text, Card } from "../../ui";
import RecordTable from "./components/RecordTable/RecordTable";
import CreateRecord from "./components/CreateRecord";
import useRecordStore from "../../stores/RecordStore";
import { useEffect, useMemo, useState } from "react";
import useGeneralDataStore from "../../stores/GeneralDataStore";
import getRecords from "./funcs/getRecords";
import useFilterSortRecords, {
  RecordFilterType,
  RecordSortType,
} from "./funcs/useFilterSortRecords";

function Record(props: BoxProps) {
  const { data: recordData, set } = useRecordStore();
  const { data: generalData } = useGeneralDataStore();

  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<RecordFilterType>("");
  const [sort, setSort] = useState<RecordSortType>("");

  const thisRecordData = useMemo(
    () => useFilterSortRecords(filter, sort, recordData),
    [filter, sort, JSON.stringify(recordData)]
  );

  const filterMenuFunc = (value: any) => {
    setFilter(value);
  };

  const sortMenuFunc = (value: any) => {
    setSort(value);
  };

  useEffect(() => {
    (async () => {
      const formattedRecordData = await getRecords(generalData.id);
      setIsLoading(false);
      set(formattedRecordData);
    })();
  }, [generalData.id]);

  return (
    <Card {...props}>
      <Flex justifyContent={"space-between"}>
        <Flex gap={"16px"}>
          <Menu>
            <MenuButton>
              <Text
                display={"flex"}
                alignItems={"center"}
                gap={"8px"}
                cursor={"pointer"}
              >
                <Image src={Filter} w={"25px"} h={"auto"} />
                Фільтр
              </Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue=""
                type="radio"
                onChange={(value) => filterMenuFunc(value)}
              >
                <MenuItemOption value={""}>Без фільтрів</MenuItemOption>
                <MenuItemOption value={"plus"}>Тільки плюси</MenuItemOption>
                <MenuItemOption value={"minus"}>Тільки мінуси</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton>
              <Text
                display={"flex"}
                alignItems={"center"}
                gap={"8px"}
                cursor={"pointer"}
              >
                <Image src={Sort} w={"25px"} h={"auto"} />
                Сортування
              </Text>
            </MenuButton>
            <MenuList>
              <MenuOptionGroup
                defaultValue=""
                type="radio"
                onChange={(value) => sortMenuFunc(value)}
              >
                <MenuItemOption value="">Без сортування</MenuItemOption>
                <MenuItemOption value="alfUp">
                  За алфавітом вверх
                </MenuItemOption>
                <MenuItemOption value="alfDown">
                  За алфавітом вниз
                </MenuItemOption>
                <MenuItemOption value="sumUp">За сумою більше</MenuItemOption>
                <MenuItemOption value="sumDown">За сумою менше</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Flex>
        <CreateRecord />
      </Flex>
      <RecordTable mt={"60px"} data={thisRecordData} isLoading={isLoading} />
    </Card>
  );
}

export default Record;
