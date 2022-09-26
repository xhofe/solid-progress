import { Component, createSignal } from "solid-js";
import { ProgressBar, progress } from ".";

const App: Component = () => {
  const [shown, setShown] = createSignal(false);
  return (
    <div>
      <ProgressBar />
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
