import { Element } from './element.js';
import { displayTasks } from "./task.js";

export function loadHeader(headerText){
    const contentHeader = new Element('div.content>h2');
    contentHeader.setText(headerText);
}


export function loadHome(){
    loadHeader('All Tasks');
    const taskArray = displayTasks('all');
    console.table(taskArray);
}