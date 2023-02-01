import { initControl } from "./control.js";
import { state } from "./state.js";

const initPomodoro = () => {
    initControl();
    state.activeTodo = {
        id: 'default',
        pomodoro: 2,
        title: 'Помодоро',
    };
};

initPomodoro();