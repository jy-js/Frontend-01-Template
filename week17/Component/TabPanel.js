import { create, Text, Wrapper } from './create';
import { Timeline, Animation } from './animation';
import { ease, linear } from "./cubicBezier";

export class TabPanel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null);
    }

    setAttribute(name, value) { //attribute
        this.attributes.set(name, value);
    }

    getAttribute(name) {
        return this.attributes.get(name);
    }

    appendChild(child){
        this.children.push(child);
    }

    select(i) {
        for (let view of this.childViews) {
            view.style.display = 'none';
        }
        this.childViews[i].style.display = '';

        for (let view of this.titleViews) {
            view.classList.remove('selected');
        }
        this.titleViews[i].classList.add('selected');
    }

    render() {
        this.childViews = this.children.map(child => <div style="width:400px;min-height:300px;">{child}</div>)
        this.titleViews = this.children.map((child, i) =>       
            (<span onClick={() => this.select(i)} style="background-color:lightgreen;margin:2px;flex:1;">
                {child.getAttribute('title') || " "}
            </span>)
        )

        setTimeout(() => this.select(0), 16);
        return <div class="tab-panel" style="border:solid 1px lightgreen;width:400px;">
            <h1 style="width:400px;margin:0;display:flex;">{this.titleViews}</h1>
            <div style="width:400px;min-height: 300px;">
                {this.childViews}
            </div>
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}