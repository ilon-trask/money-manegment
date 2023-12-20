import { Heading, HeadingProps } from "@chakra-ui/react";

function H3(props: HeadingProps) {
  return (
    <Heading fontWeight={"semibold"} fontSize={"32px"} {...props}>
      {props.children}
    </Heading>
  );
}

export default H3;
