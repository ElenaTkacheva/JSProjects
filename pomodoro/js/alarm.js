import { state } from "./state.js";

const audio = {
  work: new Audio("audio/wave.mp3"),
  break: new Audio("audio/ya-ustala.mp3"),
  relax: new Audio("audio/eralash.mp3"),
};

export const alarm = () => {
    audio[state.status].play();
};