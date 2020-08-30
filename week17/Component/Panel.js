import { create, Text, Wrapper } from './create';
import { Timeline, Animation } from './animation';
import { ease, linear } from "./cubicBezier";

export class Panel {
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) { //attribute
        this.attributes.set(name, value);
    }

    appendChild(child){
        this.children.push(child);
    }

    render() {
        return <div class="panel" style="border:solid 1px lightgreen;width:300px;">
            <h1 style="background-color:lightgreen;width:300px;margin:0;">{this.attributes.get("title")}</h1>
            <div style="width:300px;min-height: 300px;">
                {this.children}
            </div>
        </div>
    }

    mountTo(parent){
        this.render().mountTo(parent)
    }
}