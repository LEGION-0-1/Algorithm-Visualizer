function Controls({
  speed,
  setSpeed,
  size,
  setSize,
  onGenerate,
  onStart,
  running,
}) {
  return (
    <div className="flex flex-col gap-6 items-center w-full">
      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={onGenerate}
          disabled={running}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:bg-gray-500"
        >
          🔄 Generate Array
        </button>

        <button
          onClick={onStart}
          disabled={running}
          className={`px-5 py-2 rounded-lg text-white font-semibold flex items-center gap-2 transition
            ${
              running
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          ▶ Play All
        </button>
      </div>

      {/* Sliders */}
      <div className="flex gap-6 flex-wrap justify-center">
        <label className="flex items-center gap-2">
          Speed:
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={running}
          />
          <span>{speed} ms</span>
        </label>

        <label className="flex items-center gap-2">
          Size:
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={running}
          />
          <span>{size}</span>
        </label>
      </div>
    </div>
  );
}

export default Controls;
