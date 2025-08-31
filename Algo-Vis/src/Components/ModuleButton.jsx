import { useState } from "react";
import Input from "./CPU Scheduling/Input/Input.jsx";
import Output from "./CPU Scheduling/Output/Output.jsx";
import Sorting from "./Sorting/SortingVisualizer.jsx";

function ModuleNavigator() {
  const [activeModule, setActiveModule] = useState(null);
  const [processes, setProcesses] = useState([]);

  const goBack = () => setActiveModule(null);

  if (activeModule === "CPU Scheduling") {
    return (
      <div className="w-full h-screen flex flex-col">
        <div className="p-4">
          <button
            onClick={goBack}
            className="px-4 left py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            ← Back
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <Input onProcessChange={setProcesses} />
          <Output processes={processes} />
        </div>
      </div>
    );
  }

  if (activeModule === "Sorting") {
    return (
      <div className="w-full h-screen flex flex-col">
        <div className="p-4">
          <button
            onClick={goBack}
            className="px-4 py-2 left bg-gray-300 rounded hover:bg-gray-400"
          >
            ← Back
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <Sorting />
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="flex flex-col items-space-between justify-center h-screen gap-6">
      <h1 className="text-xl font-bold mb-4">Please select the suitable Algorithm from the options</h1>
      <button
        onClick={() => setActiveModule("CPU Scheduling")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        CPU Scheduling
      </button>
      <button
        onClick={() => setActiveModule("Sorting")}
        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
      >
        Sorting Algorithms
      </button>
    </div>
  );
}

export default ModuleNavigator;
