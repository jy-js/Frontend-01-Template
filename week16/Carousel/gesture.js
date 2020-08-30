export function enableGesture(element) {
    let contexts = Object.create(null)

    let MOUSE_SYMBOL = Symbol("mouse")
    if (document.ontouchstart !== null) {
        element.addEventListener("mousedown", (event) => {
            contexts[MOUSE_SYMBOL] = Object.create(null)
            start(event, contexts[MOUSE_SYMBOL])
            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL])
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL])
                document.removeEventListener("mousemove", mousemove)
                document.removeEventListener("mousedown", mouseend)
            }
            document.addEventListener("mousemove", mousemove)
            document.addEventListener("mouseup", mouseend)
        })
    }

    element.addEventListener("touchstart", event => {
        for (let touch of event.changedTouches) {
            start(touch, contexts[touch.identifier])
        }
    })

    element.addEventListener("touchmove", event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }
    })

    element.addEventListener("touchend", event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })

    element.addEventListener("touchcancel", event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier])
            delete contexts[touch.identifier]
        }
    })

    let start = (point, context) => {
        let s = new CustomEvent('start')
        Object.assign(s, {
            startX: point.clientX,
            startY: point.clientY,
            clientX: point.clientX,
            clientY: point.clientY
        })
        element.dispatchEvent(s)
        context.startX = point.clientX, context.startY = point.clientY
        // 留存离开时的速度，计算是pan还是flick
        context.moves = []
        // 事件开始设置默认触发事件
        context.isTap = true
        context.isPan = false
        context.isPress = false
        // 长按0.5s后变为press
        context.timeoutHandler = setTimeout(() => {
            // pan的优先级高于press
            if (context.isPan) {
                return
            }
            context.isTap = false
            context.isPan = false
            context.isPress = true
            // 事件分发
            element.dispatchEvent(new CustomEvent('pressstart', {}))
        }, 500)
    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX,
            dy = point.clientY - context.startY
        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (context.isPress) {
                element.dispatchEvent(new CustomEvent('presscancel', {}))
            }
            context.isTap = false
            context.isPan = true
            context.isPress = false
            let ps = new CustomEvent('panstart')
            Object.assign(ps, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            })
            element.dispatchEvent(ps)
        }

        context.moves.push({
            dx,
            dy,
            t: Date.now()
        })

        context.moves = context.moves.filter(record => Date.now() - record.t < 300)

        if (context.isPan) {
            // 事件分发
            let e = new CustomEvent('pan')
            Object.assign(e, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            })
            element.dispatchEvent(e)
        }
    }

    let end = (point, context) => {
        if (context.isPan) {
            let dx = point.clientX - context.startX,
                dy = point.clientY - context.startY
            let s0 = context.moves[0]
            let speed = Math.sqrt((s0.dx - dx) ** 2 + (s0.dy - dy) ** 2) / (Date.now() - s0.t)
            let isFlick = speed > 2.5
            if (isFlick) {
                let fk = new CustomEvent('flick')
                Object.assign(fk, {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed
                })
                element.dispatchEvent(fk)
            }
            let pd = new CustomEvent('panend')
            Object.assign(pd, {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed: speed,
                isFlick: isFlick
            })
            element.dispatchEvent(pd)
        }

        if (context.isTap) {
            element.dispatchEvent(new CustomEvent('tap', {}))
        }

        if (context.isPress) {
            element.dispatchEvent(new CustomEvent('pressend', {}))
        }

        clearTimeout(context.timeoutHandler)
    }

    let cancel = (point, context) => {
        element.dispatchEvent(new CustomEvent('cancel', {}))
        clearTimeout(context.timeoutHandler)
    }
}