import { useState, useEffect } from "react";
import Controls from "./Controls";
import ArrayBars from "./ArrayBars";

import heapSort from "./algorithms/heapSort";
import bubbleSort from "./Algorithms/bubbleSort";
import selectionSort from "./Algorithms/selectionSort";
import mergeSort from "./Algorithms/mergeSort";
import insertionSort from "./algorithms/insertionSort";
import quickSort from "./Algorithms/quickSort";

const ALGORITHMS = {
  HeapSort: heapSort,
  BubbleSort: bubbleSort,
  SelectionSort: selectionSort,
  MergeSort: mergeSort,
  InsertionSort: insertionSort,
  QuickSort: quickSort,
};

function SortingVisualizer() {
  const [baseArray, setBaseArray] = useState([]);
  const [speed, setSpeed] = useState(300);
  const [size, setSize] = useState(20);
  const [running, setRunning] = useState(false);
  const [algoStates, setAlgoStates] = useState({});

  useEffect(() => {
    generateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  const generateArray = () => {
    if (running) return;
    const arr = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 5
    );
    setBaseArray(arr);
    setAlgoStates(
      Object.keys(ALGORITHMS).reduce((acc, name) => {
        acc[name] = {
          array: [...arr],
          highlight: [],
          sorted: [],
          log: [],
          running: false,
        };
        return acc;
      }, {})
    );
  };

  const runAlgo = async (name, algo) => {
    setAlgoStates((prev) => ({
      ...prev,
      [name]: { ...prev[name], running: true, log: [`Starting ${name}...`] },
    }));

    await algo({
      array: [...baseArray],
      setArray: (arr) =>
        setAlgoStates((prev) => ({
          ...prev,
          [name]: { ...prev[name], array: [...arr] },
        })),
      speed,
      setLog: (updater) =>
        setAlgoStates((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            log:
              typeof updater === "function"
                ? updater(prev[name].log)
                : updater,
          },
        })),
      setHighlight: (h) =>
        setAlgoStates((prev) => ({
          ...prev,
          [name]: { ...prev[name], highlight: h },
        })),
      setSorted: (s) =>
        setAlgoStates((prev) => ({
          ...prev,
          [name]: { ...prev[name], sorted: s },
        })),
    });

    setAlgoStates((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        running: false,
        log: [...prev[name].log, `${name} completed!`],
      },
    }));
  };

  const startSorting = async () => {
    if (running) return;
    setRunning(true);

    // Run algorithms one by one (sequentially)
    for (const [name, algo] of Object.entries(ALGORITHMS)) {
      await runAlgo(name, algo);
    }

    setRunning(false);
  };

  return (
    <div
      className="w-screen h-screen flex flex-col bg-gray-900 text-white"
      style={{ overflow: "hidden" }}
    >
      {/* Controls on top */}
      <div className="p-4 bg-gray-800 shadow-md">
        <Controls
          speed={speed}
          setSpeed={setSpeed}
          size={size}
          setSize={setSize}
          onGenerate={generateArray}
          onStart={startSorting}
          running={running}
          selectedAlgo={""}
          setSelectedAlgo={() => {}}
          algorithms={Object.keys(ALGORITHMS)}
        />
      </div>

      {/* Grid of cards filling screen */}
      <div
        className="flex-1 grid gap-6 p-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          overflowY: "auto",
        }}
      >
        {Object.keys(ALGORITHMS).map((name) => {
          const state = algoStates[name];
          if (!state) return null;
          return (
            <div
              key={name}
              className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg"
            >
              <h2 className="text-xl font-bold mb-4">{name}</h2>
              <div className="w-full flex-1 flex items-end justify-center">
                <ArrayBars
                  array={state.array}
                  highlight={state.highlight}
                  sorted={state.sorted}
                />
              </div>
              <div className="mt-4 text-xs text-green-300 h-24 w-full overflow-y-auto bg-black bg-opacity-50 p-2 rounded">
                {state.log.map((entry, idx) => (
                  <div key={idx}>{entry}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SortingVisualizer;
