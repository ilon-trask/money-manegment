import { Text as ChakraText, TextProps } from "@chakra-ui/react";
function Text(props: TextProps) {
  return (
    <ChakraText fontSize={"22px"} {...props}>
      {props.children}
    </ChakraText>
  );
}

export default Text;
