import { DeleteIcon, IconProps } from "@chakra-ui/icons";

function MyDeleteIcon(props: IconProps) {
  return (
    <DeleteIcon
      {...props}
      w={"20px"}
      h={"auto"}
      cursor={"pointer"}
      color={"red.500"}
    />
  );
}

export default MyDeleteIcon;
