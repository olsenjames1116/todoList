import { Element } from './element.js';
import { task } from './index.js';
import { displayTasks } from "./task.js";

export function loadHeader(headerText){
    const contentHeader = new Element('div.content>h2');
    contentHeader.setText(headerText);
}

//Display appropriate header and new task button under all tasks
export function loadHome(){
    loadHeader('All Tasks');
    task.setAttribute('style', 'display: block');
    const taskArray = displayTasks('All Tasks');
}