export class Timeline {
  constructor() {
    this.animation = [];
  }
  tick() {
    let t = this.startTime - Date.now();

    for(let animation of this.animation) {
      if(t > animation.duration + animation.delay) {
        continue;
      }
      let { object, property, start, end, timingFunction, delay } = animation;
      object[property] = timingFunction(start, end)(t - delay);
    }
    requestAnimationFrame(() => this.tick());
  }
  start() {
    this.startTime = Date.now();
    this.tick();
  }

  add(animation) {
    this.animation.push(animation);
  }
}

export class Animation {
  constructor(object, property, start, end , duration, delay, timingFunction) {
    this.object = object;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction || ((start, end) => {
      return (t) => start + (t / duration) * (end - start)
    });
  }
}