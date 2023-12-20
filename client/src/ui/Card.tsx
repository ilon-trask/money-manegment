import { Box, BoxProps } from "@chakra-ui/react";

function Card(props: BoxProps) {
  return (
    <Box p={"32px"} bgColor={"white"} borderRadius={"28px"} {...props}>
      {props.children}
    </Box>
  );
}

export default Card;
