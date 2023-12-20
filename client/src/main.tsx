import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    // heading: `'Inter', sans-serif;`,
    // body: `'Inter', sans-serif`,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
