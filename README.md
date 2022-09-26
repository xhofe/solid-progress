# solid-progress

☘ A solidjs component of progress bar, the custom colors are supported. Inspired by [vue3-progress](https://github.com/tangyouge/vue3-progress) but for [Solidjs](https://solidjs.com).

[![release](https://github.com/Xhofe/solid-progress/actions/workflows/release.yml/badge.svg)](https://github.com/Xhofe/solid-progress/actions/workflows/release.yml) [![npm](https://img.shields.io/npm/dm/solid-progress.svg)](https://www.npmjs.com/package/solid-progress) [![npm](https://img.shields.io/npm/v/solid-progress.svg)](https://www.npmjs.com/package/solid-progress) [![license](https://img.shields.io/github/license/Xhofe/solid-progress.svg)](https://github.com/Xhofe/solid-progress/blob/main/LICENSE)

## Installation

```bash
pnpm add solid-progress
```

## Demo
<https://xhofe.github.io/solid-progress/>

## Usage

```tsx
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

```