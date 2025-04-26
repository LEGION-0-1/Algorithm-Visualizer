import React, { useState } from 'react';
import GanttChart from './GanntChart.jsx'

function SchedulerLogic({ processes }) {
  if (!processes || processes.length === 0) {
    return <p>No processes provided.</p>;
  }

  const algorithms = ['FCFS', 'SJF', 'Priority', 'RoundRobin'];
  const [timeQuantum, setTimeQuantum] = useState(2);

  const processAlgorithms = (algo) => {
    const proc = processes.map(p => ({
      id: p.id,
      arrivalTime: parseInt(p.arrivalTime) || 0,
      burstTime: parseInt(p.burstTime) || 0,
      priority: parseInt(p.priority) || 0,
      remainingTime: parseInt(p.burstTime) || 0,
      completed: false,
    }));

    let scheduled = [];
    let ganttChart = [];
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;
    let currentTime = 0;
    let completedCount = 0;
    const n = proc.length;

    if (algo === 'FCFS') {
      proc.sort((a, b) => a.arrivalTime - b.arrivalTime);
      proc.forEach(p => {
        const startTime = Math.max(currentTime, p.arrivalTime);
        const completionTime = startTime + p.burstTime;
        const turnaroundTime = completionTime - p.arrivalTime;
        const waitingTime = turnaroundTime - p.burstTime;

        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

        scheduled.push({ id: p.id, startTime, completionTime, turnaroundTime, waitingTime });
        ganttChart.push({ id: p.id, start: startTime, end: completionTime });

        currentTime = completionTime;
      });

    } else if (algo === 'SJF') {
      while (completedCount < n) {
        let candidates = proc.filter(p => !p.completed && p.arrivalTime <= currentTime);
        if (candidates.length === 0) {
          currentTime++;
          continue;
        }
        candidates.sort((a, b) => a.burstTime - b.burstTime || a.arrivalTime - b.arrivalTime);
        const p = candidates[0];

        const startTime = Math.max(currentTime, p.arrivalTime);
        const completionTime = startTime + p.burstTime;
        const turnaroundTime = completionTime - p.arrivalTime;
        const waitingTime = turnaroundTime - p.burstTime;

        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

        scheduled.push({ id: p.id, startTime, completionTime, turnaroundTime, waitingTime });
        ganttChart.push({ id: p.id, start: startTime, end: completionTime });

        p.completed = true;
        completedCount++;
        currentTime = completionTime;
      }

    } else if (algo === 'Priority') {
      while (completedCount < n) {
        let candidates = proc.filter(p => !p.completed && p.arrivalTime <= currentTime);
        if (candidates.length === 0) {
          currentTime++;
          continue;
        }
        candidates.sort((a, b) => a.priority - b.priority || a.arrivalTime - b.arrivalTime);
        const p = candidates[0];

        const startTime = Math.max(currentTime, p.arrivalTime);
        const completionTime = startTime + p.burstTime;
        const turnaroundTime = completionTime - p.arrivalTime;
        const waitingTime = turnaroundTime - p.burstTime;

        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

        scheduled.push({ id: p.id, startTime, completionTime, turnaroundTime, waitingTime });
        ganttChart.push({ id: p.id, start: startTime, end: completionTime });

        p.completed = true;
        completedCount++;
        currentTime = completionTime;
      }

    } else if (algo === 'RoundRobin') {
      let queue = [];
      proc.sort((a, b) => a.arrivalTime - b.arrivalTime);
      let i = 0;

      while (completedCount < n) {
        while (i < n && proc[i].arrivalTime <= currentTime) {
          queue.push(proc[i]);
          i++;
        }

        if (queue.length === 0) {
          currentTime++;
          continue;
        }

        const p = queue.shift();
        const startTime = currentTime;
        const executionTime = Math.min(timeQuantum, p.remainingTime);
        currentTime += executionTime;
        p.remainingTime -= executionTime;

        ganttChart.push({ id: p.id, start: startTime, end: currentTime });

        if (p.remainingTime === 0) {
          const completionTime = currentTime;
          const turnaroundTime = completionTime - p.arrivalTime;
          const waitingTime = turnaroundTime - p.burstTime;

          totalWaitingTime += waitingTime;
          totalTurnaroundTime += turnaroundTime;

          scheduled.push({ id: p.id, startTime: p.arrivalTime, completionTime, turnaroundTime, waitingTime });

          p.completed = true;
          completedCount++;
        } else {
          queue.push(p);
        }

        while (i < n && proc[i].arrivalTime <= currentTime) {
          queue.push(proc[i]);
          i++;
        }
      }
    }

    const avgWaitingTime = (totalWaitingTime / n).toFixed(2);
    const avgTurnaroundTime = (totalTurnaroundTime / n).toFixed(2);

    return { scheduled, ganttChart, avgWaitingTime, avgTurnaroundTime };
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {algorithms.map((algo, idx) => {
        const { scheduled, ganttChart, avgWaitingTime, avgTurnaroundTime } = processAlgorithms(algo);

        return (
          <div key={idx} className="algorithm-box" style={{ flex: '1 1 45%', padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2 style={{ textAlign: 'center' }}>{algo} Scheduling</h2>

            {algo === 'RoundRobin' && (
              <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                <label>Time Quantum: </label>
                <input
                  type="number"
                  value={timeQuantum}
                  min="1"
                  onChange={(e) => setTimeQuantum(parseInt(e.target.value) || 1)}
                  style={{ width: '60px', textAlign: 'center' }}
                />
              </div>
            )}

            <GanttChart chartData={ganttChart} />

            <table border="1" width="100%" style={{ textAlign: "center", marginBottom: "20px" }}>
              <thead>
                <tr>
                  <th>Process</th>
                  <th>Start Time</th>
                  <th>Completion Time</th>
                  <th>Turnaround Time</th>
                  <th>Waiting Time</th>
                </tr>
              </thead>
              <tbody>
                {scheduled.map((p, i) => (
                  <tr key={i}>
                    <td>{p.id}</td>
                    <td>{p.startTime}</td>
                    <td>{p.completionTime}</td>
                    <td>{p.turnaroundTime}</td>
                    <td>{p.waitingTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p><strong>Average Waiting Time:</strong> {avgWaitingTime}</p>
            <p><strong>Average Turnaround Time:</strong> {avgTurnaroundTime}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SchedulerLogic;
