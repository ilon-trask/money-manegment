import { Container } from "@chakra-ui/react";
import MainValues from "./modules/MainValues";
import RecordType from "./modules/Record";

function App() {
  return (
    <Container maxW={"container.xl"}>
      <MainValues mt={"32px"} />
      <RecordType mt={"20px"} />
    </Container>
  );
}

export default App;
