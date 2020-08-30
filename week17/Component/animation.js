export class Timeline {
    constructor() {
        this.animations = []
        this.requestId = null
        this.state = "inited"
        this.tick = () => {
            let t = Date.now() - this.startTime
            // let animations = this.animations.filter(
            //     (animation) => !animation.finished
            // )
            for (const animation of this.animations) {
                let {
                    object,
                    property,
                    template,
                    start,
                    end,
                    timingFunction,
                    delay,
                    duration,
                    addTime,
                } = animation
                let progression = timingFunction((t - delay - addTime) / duration) // 0-1之间的数
                if(t < delay + addTime){
					continue;
				}
                if (t > duration + delay + addTime) {
                    progression = 1
                    animation.finished = true
                }
                let value = animation.valueFromProgression(progression)
                object[property] = typeof template === 'function' ? template(value): value;
            }
            if (this.animations.length) {
                this.requestId = requestAnimationFrame(this.tick)
            } else {
                this.requestID = null;
            }
        }
    }

    start() {
        if (this.state !== "inited") {
            return
        }
        this.state = "playing"
        this.startTime = Date.now()
        this.tick()
    }

    pause() {
        if (this.state !== "playing") {
            return
        }
        this.state = "paused"
        this.pauseTime = Date.now()
        if (this.requestId !== null) {
            cancelAnimationFrame(this.requestId)
        }
    }

    resume() {
        if (this.state !== "paused") {
            return
        }
        this.state = "playing"
        this.startTime += Date.now() - this.pauseTime
        this.tick()
    }

    reset(){
		// 先调用pause关闭帧动画
		if(this.state === 'playing'){
			this.pause();
		}
		// 重置所有变量状态
		this.animations = new Set();
		this.finishedAnimations = new Set();
		this.addTimes = new Map();
		this.requestID = null;
		this.startTime = Date.now();
		this.pauseTime = null;
		this.state = 'inited';
    }
    
    restart() {
        if (this.state === "playing") {
            this.pause()
        }
        for(let animation of this.finishedAnimations){
			this.animations.add(animation)
		}
        this.finishedAnimations = new Set()
        this.requestId = null
        this.state = "playing"
        this.startTime = Date.now()
        this.pauseTime = null
        this.tick()
    }

    add(animation, addTime) {
		if(this.state === 'playing' && this.requestID === null){
			this.tick()
		}
		if(this.state === 'playing'){
			this.addTimes.set(animation, addTime !== void 0 ? addTime : (Date.now() - this.startTime))
		}else {
			this.addTimes.set(animation, addTime !== void 0 ? addTime : 0)
		}
		this.animations.add(animation)
	}
}

export class Animation {
    constructor(
        object,
        property,
        template,
        start,
        end,
        duration,
        delay,
        timingFunction
    ) {
        this.object = object
        this.property = property
        this.template = template
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay
        this.timingFunction = timingFunction
    }

    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start)
    }
}
export class ColorAnimation {
    constructor(
        object,
        property,
        start,
        end,
        duration,
        delay,
        timingFunction,
        template
    ) {
        this.object = object
        this.property = property
        this.template = template || ((v) => `rgba(${v.r},${v.g},${v.b},${v.a})`)
        this.start = start
        this.end = end
        this.duration = duration
        this.delay = delay
        this.timingFunction = timingFunction
    }

    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}