import { Component, createSignal, onMount } from "solid-js";
import { ProgressBar, progress } from "solid-progress";
import "solid-progress/dist/style.css";

const App: Component = () => {
  const [shown, setShown] = createSignal(true);
  return (
    <div>
      <ProgressBar opened />
      <div
        style={{
          height: "80vh",
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
          "align-items": "center",
        }}
      >
        <h1>solid-progress</h1>
        <button
          onClick={() => {
            setShown(!shown());
            if (shown()) {
              progress.start();
            } else {
              progress.finish();
            }
          }}
        >
          {shown() ? "finish" : "start"}
        </button>
      </div>
    </div>
  );
};

export default App;
