import React from 'react';

const colorMap = {
  1: 'red',
  2: 'green',
  3: 'blue',
  4: 'orange',
  5: 'purple',
  6: 'teal',
  7: 'pink',
  8: 'brown',
  9: 'cyan',
  10: 'magenta'
};

function GanttChart({ chartData }) {
  if (!chartData || chartData.length === 0) {
    return <p>No Gantt chart data available.</p>;
  }

  const timeUnitWidth = 30;

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
        {chartData.map((p, index) => (
          <div
            key={index}
            style={{
              backgroundColor: colorMap[p.id] || 'gray',
              width: `${(p.end - p.start) * timeUnitWidth}px`,
              height: '50px',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid black',
              fontWeight: 'bold'
            }}
          >
            P{p.id}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {chartData.map((p, index) => (
          <React.Fragment key={index}>
            {/* Start Time */}
            <div style={{
              width: `${(p.end - p.start) * timeUnitWidth}px`,
              textAlign: 'left',
              fontSize: '12px',
              paddingLeft: '2px'
            }}>
              {p.start}
            </div>
          </React.Fragment>
        ))}
        <div style={{ fontSize: '12px', paddingLeft: '2px' }}>
          {chartData[chartData.length - 1].end}
        </div>
      </div>
    </div>
  );
}

export default GanttChart;
