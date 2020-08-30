import { Timeline, Animation, ColorAnimation } from "./animation.js";
import { cubicBezier } from "./cubicBezier.js";

let linear = t => t;
let ease = cubicBezier(.25, .1, .25, 1);

let el = document.getElementById("wrapper");

let tl = new Timeline;

tl.add(new Animation(el.style, "transform", 0, 200, 5000, 0, linear, v => `translateX(${v}px)`));
tl.start();

document.getElementById("pauseBtn").addEventListener("click", () => {
    tl.pause()
});

document.getElementById("resumeBtn").addEventListener("click", () => {
    tl.resume()
});

document.getElementById("startBtn").addEventListener("click", () => {
    tl.add(new ColorAnimation(el.style, "backgroundColor",
        { r: 0, g: 0, b: 0, a: 1 }, { r: 255, g: 0, b: 0, a: 1 }, 5000, 0, linear))
});