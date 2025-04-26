import React from 'react';
import SchedulerLogic from './SchedulerLogic.jsx';

function Output({ processes }) {
  return (
    <div className="output-container">
      <SchedulerLogic processes={processes} />
    </div>
  );
}

export default Output;
