import React from 'react';
import SchedulerLogic from './SchedulerLogic.jsx'; // Import your scheduler engine

function Output({ processes }) {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Scheduling Outputs</h2>
      <SchedulerLogic processes={processes} algorithm="FCFS" />
    </div>
  );
}

export default Output;
