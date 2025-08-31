import ModuleButton from "./Components/ModuleButton.jsx";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-xxl text-center top font-bold mb-4">Algorithm Visualizer</h1>

      {/* Pass module names here */}
      <ModuleButton />
    </div>
  );
}

export default App;