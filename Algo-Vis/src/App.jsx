import { useState } from 'react';
import Input from "./Components/Input/Input.jsx";
import Output from "./Components/Output/Output.jsx";

function App() {
  const [processes, setProcesses] = useState([]);

  return (
    <>
      <Input onProcessChange={setProcesses} />
      <Output processes={processes} />
    </>
  );
}

export default App;
