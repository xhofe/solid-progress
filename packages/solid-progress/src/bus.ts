import mitt from "mitt";
import { JSX } from "solid-js";
type Event = {
  start?: undefined;
  height: JSX.CSSProperties["height"];
  finish?: undefined;
};
export const bus = mitt<Event>();
