import { useState } from "react";
import MainValues from "./modules/MainValues";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-screen-lg mx-auto">
      <MainValues mt={"32px"} />
      {/* <RecordType mt={"20px"} /> */}
    </div>
  );
}

export default App;
