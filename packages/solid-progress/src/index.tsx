import { JSX } from "solid-js";
import { bus } from "./bus";

export * from "./components/ProgressBar";
export const progress = {
  start: () => bus.emit("start"),
  finish: () => bus.emit("finish"),
  height: (h: JSX.CSSProperties["height"]) => bus.emit("height", h),
};
