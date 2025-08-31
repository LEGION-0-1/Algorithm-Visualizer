import "./ArrayBars.css";

function ArrayBars({ array, highlight, sorted }) {
  return (
    <div className="array-card">
      <h2 className="array-title">Sorting Visualizer</h2>
      <div className="array-container">
        {array.map((val, i) => (
          <div
            key={i}
            className={`array-bar ${
              sorted.includes(i)
                ? "bar-sorted"
                : highlight.includes(i)
                ? "bar-highlight"
                : ""
            }`}
            style={{ height: `${val * 3}px` }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArrayBars;
