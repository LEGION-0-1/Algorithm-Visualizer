import React, { useState } from 'react';
import InputDiv from './inputDiv.jsx';

function Input({ onProcessChange }) {
  const [ids, setIds] = useState(["", "", ""]);
  const [arrivalTimes, setArrivalTimes] = useState(["", "", ""]);
  const [burstTimes, setBurstTimes] = useState(["", "", ""]);
  const [priorities, setPriorities] = useState(["", "", ""]);

  // Whenever input changes, update the parent
  React.useEffect(() => {
    const processes = ids.map((id, index) => ({
      id,
      arrivalTime: arrivalTimes[index],
      burstTime: burstTimes[index],
      priority: priorities[index]
    }));

    onProcessChange(processes); // send to App.jsx
  }, [ids, arrivalTimes, burstTimes, priorities, onProcessChange]);

  return (
    <>
      <h2>Process Inputs</h2>
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-start", width: "100dvw", flexWrap: "wrap" }}>
        <InputDiv divName="Process ID" Field="Process " values={ids} setValues={setIds} />
        <InputDiv divName="Arrival Time" Field="Arrival " values={arrivalTimes} setValues={setArrivalTimes} />
        <InputDiv divName="Burst Time" Field="Burst " values={burstTimes} setValues={setBurstTimes} />
        <InputDiv divName="Priority" Field="Priority " values={priorities} setValues={setPriorities} />
      </div>
    </>
  );
}

export default Input;
