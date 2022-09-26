import { createSignal, onMount, JSX, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { bus } from "../bus";
import "./ProgressBar.css";

export interface ProgressBarProps {
  position?: JSX.CSSProperties["position"];
  height?: JSX.CSSProperties["height"];
  color?: JSX.CSSProperties["background"];
  opened?: boolean;
}
export const ProgressBar = (props: ProgressBarProps) => {
  const [opacity, setOpacity] = createSignal(1);
  const [display, setDisplay] = createSignal("none");
  const [height, setHeight] = createSignal(props.height || "3px");
  const [state, setState] = createStore<{
    timer: {
      fadeAway: number | null;
      fill: number | null;
    };
    isFull: boolean;
    isWFA: boolean;
  }>({
    timer: { fadeAway: null, fill: null },
    isFull: false,
    isWFA: false,
  });
  const begin = () => {
    setOpacity(1);
    setDisplay("block");
  };
  const fade = () => {
    setOpacity(0);
    setDisplay("block");
  };
  const afterFade = () => {
    setDisplay("none");
  };
  const fillBeginning = () => {
    setState("isFull", false);
    begin();
  };
  const fillFinally = () => {
    setState("isFull", true);
    setState("timer", "fill", null);
  };
  const fadeBeginning = () => {
    setState("isWFA", false);
    fade();
  };
  const fadeFinally = () => {
    setState("timer", "fadeAway", null);
    setState("isFull", false);
    afterFade();
  };
  const killFading = () => {
    clearTimeout(state.timer.fadeAway ?? undefined);
    setState("isWFA", false);
    setState("timer", "fadeAway", null);
  };
  const hide = () => {
    if (state.timer.fadeAway) return;
    if (state.timer.fill) {
      setState("isWFA", true);
      return;
    }
    fadeBeginning();
    setState("timer", "fadeAway", window.setTimeout(fadeFinally, 200));
  };
  const start = () => {
    killFading();
    if (state.timer.fill) return;
    fillBeginning();
    setState(
      "timer",
      "fill",
      window.setTimeout(() => {
        fillFinally();
        if (state.isWFA) {
          hide();
        }
      }, 500)
    );
  };
  onMount(() => {
    bus.on("start", start);
    bus.on("finish", hide);
    bus.on("height", (h) => {
      setHeight(h);
    });
    if (props.opened) {
      start();
    }
  });
  onCleanup(() => {
    bus.off("*");
  });
  const style = () => {
    return {
      position: props.position || "fixed",
      height: height(),
      background: props.color,
      opacity: opacity(),
      display: display(),
    };
  };
  return <div class="solid-progress" style={style()}></div>;
};
