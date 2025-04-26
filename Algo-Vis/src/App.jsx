import { useState } from 'react';
import Input from './Components/CPU Scheduling/Input/Input.jsx'
import Output from './Components/CPU Scheduling/Output/Output.jsx'

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
