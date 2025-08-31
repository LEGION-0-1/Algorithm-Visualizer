# Algo-Vis (Algorithm Visualizer)

![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)
![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB.svg)
![Project Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

Algo-Vis is a simple, React-based visualization tool for understanding CPU scheduling and sorting algorithms.  
It allows users to input processes, arrival times, burst times, priorities, and a time quantum (where applicable) to visually understand how different CPU scheduling algorithms behave.  
It also provides visualizations of multiple sorting algorithms in action to help learners grasp how they differ step by step.

> ⚡ **Note:** This project is currently under development. CPU scheduling algorithms are completed, and the sorting visualizer is in **Phase 2** (multi-algorithm support). Future updates will expand visualization to Searching algorithms as well.

---

## ✨ Features

- **Visualizes CPU Scheduling Algorithms:**
  - First Come First Serve (FCFS)
  - Round Robin (with user-defined time quantum)
  - Priority Scheduling
  - Shortest Job First (SJF)

- **Visualizes Sorting Algorithms (Phase 2):**
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort

- **User Inputs for CPU Scheduling:**
  - Process names/IDs
  - Arrival times
  - Burst times
  - Priorities
  - Time quantum (for Round Robin)

---

## 🛠️ Tech Stack

- React
- HTML
- CSS
- JavaScript
- Tailwind

---

## 🚀 Future Updates

- Visualization for Searching Algorithms (e.g., Linear Search, Binary Search)
- Additional improvements for Sorting Visualizer:
  - Better execution
  - Lesser bugs
  - Enhanced color-coded animations
- Improved UI/UX
- Support for more than 3 processes in CPU scheduling
- Error handling and input validations

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/algorithm-visualizer.git

# Navigate into the project directory
cd algorithm-visualizer

# Install dependencies
npm install

# Start the development server
npm start
