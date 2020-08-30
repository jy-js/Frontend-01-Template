import { create, Text, Wrapper } from './create'
import { ease } from './cubicBezier'
import { Timeline, Animation } from './animation'
import { enableGesture } from './gesture.js'
import css from "./carousel.css"

export class Carousel {
	constructor(config){
		this.children = []
		this.attributes = new Map()
		this.properties = new Map()
	}
	
	setAttribute(name, value){          // attribute
		this[name] = value
		console.log(name, value)
	}
	
	mountTo(parent){
		this.render().mountTo(parent)
	}
	appendChild(child){                 // children
		this.children.push(child)
		console.log("child:",this.children)
	}
	
	render(){
		let timeLine = new Timeline
		timeLine.start()
		let position = 0
		
		let nextPicStopHandler = null
		
		
		
		let children = this.data.map( (url, currentPosition) => {
			// 上一个
			let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length
			// 下一个
			let nextPosition = (currentPosition + 1 + this.data.length) % this.data.length
			
			let offset = 0
			
			// 此处监听收到的start事件，停止animation
			let onStart = () => {
				let currentElement = children[currentPosition]
				let currentTransform = Number(currentElement.style.transform.match(/^translateX\((.+)px\)$/)[1])
				offset = currentTransform + 500 * currentPosition
				
				timeLine.pause()
				clearTimeout(nextPicStopHandler)
			}
		
			let onPan = event => {
				let lastElement = children[lastPosition]
				let currentElement = children[currentPosition]
				let nextElement = children[nextPosition]
				
				let dx = event.clientX - event.startX
				let currentTransform = -500 * currentPosition + offset + dx
				let lastTransform = -500 -500 * lastPosition + offset + dx
				let nextTransform = 500 -500 * nextPosition + offset + dx
				
				
				lastElement.style.transform = `translateX(${lastTransform}px)`
				currentElement.style.transform = `translateX(${currentTransform}px)`
				nextElement.style.transform = `translateX(${nextTransform}px)`
			}
			
			let onPanend = event => {
				let direction = 0
				let dx = event.clientX - event.startX
				
				let flickLeft = false
				
				
				
				if(dx + offset > 250 || dx > 0 && event.isFlick){
					direction = 1
				}else if(dx + offset < -250 || dx < 0 && event.isFlick){
					direction = -1
				}
				timeLine.reset()
				timeLine.start()
				
				
				let lastElement = children[lastPosition]
				let currentElement = children[currentPosition]
				let nextElement = children[nextPosition]
				
				let currentTransform = -500 * currentPosition + offset + dx
				let lastTransform = -500 -500 * lastPosition + offset + dx
				let nextTransform = 500 -500 * nextPosition + offset + dx
				
				// 动画效果
				let lastAnimation = new Animation(lastElement.style, 'transform', -500 -500 * lastPosition + offset + dx, -500 -500 * lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)
				let currentAnimation = new Animation(currentElement.style, 'transform', -500 * currentPosition + offset + dx, -500 * currentPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)
				let nextAnimation = new Animation(nextElement.style, 'transform', 500 -500 * nextPosition + offset + dx, 500 -500 * nextPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`)
					
			
				timeLine.add(lastAnimation)
				timeLine.add(currentAnimation)
				timeLine.add(nextAnimation)
				
				position = (position - direction + this.data.length) % this.data.length
				
				
				nextPicStopHandler = setTimeout(nextPic, 3000)
			}
			
			let element = <img src={url} onPan={onPan} onStart={onStart} onPanend={onPanend} enableGesture={true} />
			element.style.transform = "translateX(0px)"
			element.addEventListener("dragstart", event => event.preventDefault())
			return element
		})
		let root = <div class="carousel">
			{children }
		</div>
		
		let nextPic = () => {
			let nextPosition = (position + 1) % this.data.length
			let current = children[position]
			let next = children[nextPosition]
			
			let currentAnimation = new Animation(current.style, 'transform', -100 * position, -100 -100 * position, 500, 200, ease, v => `translateX(${5 * v}px)`)
			let nextAnimation = new Animation(next.style, 'transform', 100 -100 * nextPosition, -100 * nextPosition, 500, 200, ease, v => `translateX(${5 * v}px)`)
			
			timeLine.add(currentAnimation)
			timeLine.add(nextAnimation)
			
			
			position = nextPosition
			nextPicStopHandler = setTimeout(nextPic, 3000)
		}
		nextPicStopHandler = setTimeout(nextPic, 3000)
		
		
		return root
	}
}