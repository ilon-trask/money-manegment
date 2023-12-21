import {
  Skeleton,
  Table,
  TableProps,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import MyDeleteIcon from "../../../../ui/Icons/MyDeleteIcon";
import { Record } from "../../../../../../server/types";
import useGeneralDataStore from "../../../../stores/GeneralDataStore";
import useRecordStore from "../../../../stores/RecordStore";
import client from "../../../../lib/trpc";
import useComfortNumber from "../../../../funcs/useComfortNumber";

function useDateFormat(date: string | Date) {
  const parsedDate = new Date(date);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  //@ts-ignore
  const formattedDate = parsedDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

function Row({
  id,
  name,
  type,
  sum,
  createdAt,
  deleteRecord,
}: Record & {
  deleteRecord: (id: number) => void;
}) {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        {type == "minus" ? (
          <Tag bgColor={"#F6C2C2"} color={"#A93E3E"}>
            Мінус
          </Tag>
        ) : type == "plus" ? (
          <Tag bgColor={"#D5F6C2"} color={"#65A93E"}>
            Плюс
          </Tag>
        ) : (
          <></>
        )}
      </Td>
      <Td isNumeric>{useComfortNumber(sum)}</Td>
      <Td>{useDateFormat(createdAt)}</Td>
      <Td onClick={() => deleteRecord(id)}>
        <MyDeleteIcon />
      </Td>
    </Tr>
  );
}
type Props = TableProps & { data: Record[]; isLoading: boolean };

function RecordTable(props: Props) {
  const { changeBalanceOnDeleteRecord } = useGeneralDataStore();
  const { data, delete: deleteFunc } = useRecordStore();
  async function deleteRecord(id: number) {
    const thisRecordData = data.find((el) => el.id == id);
    const result = await client.recordRouter.delete.mutate({ id });
    if (!thisRecordData || !result) throw new Error("no recordData");
    changeBalanceOnDeleteRecord(thisRecordData);
    deleteFunc(id);
  }
  return (
    <Table {...props} overflow={"hidden"}>
      <Thead bgColor={"#F6F6F6"}>
        <Tr borderRadius={"15px"} overflow={"hidden"}>
          <Th>Назва</Th>
          <Th>Тип</Th>
          <Th isNumeric>Сума</Th>
          <Th>Дата</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.isLoading ? (
          <Tr>
            <Td>
              <Skeleton height={"20px"}></Skeleton>
            </Td>
            <Td>
              <Skeleton height={"20px"}></Skeleton>
            </Td>
            <Td>
              <Skeleton height={"20px"}></Skeleton>
            </Td>
            <Td>
              <Skeleton height={"20px"}></Skeleton>
            </Td>
            <Td>
              <Skeleton height={"20px"}></Skeleton>
            </Td>
          </Tr>
        ) : props.data.length > 0 ? (
          props.data.map((el) => (
            <Row {...el} deleteRecord={deleteRecord} key={el.id} />
          ))
        ) : (
          <Tr display={"block"}>
            <Td display={"flex"} justifyItems={"center"}>
              Немає записів
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
}

export default RecordTable;
