import { create, Text, Wrapper } from './create';
import { Timeline, Animation } from './animation';
import { ease, linear } from "./cubicBezier";

export class ListView {
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

    render() {
        let data = this.getAttribute("data");

        return <div class="list-view" style="width:300px;">
            {
                data.map(this.children[0])
            }
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}