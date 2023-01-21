import { loadHeader } from './home.js';
import { task } from './index.js';
import { displayTasks } from './task.js';

//Any task with a priority of high will be displayed
export function loadImportant() {
    loadHeader('Important');
    //Hide the new task button
    task.setAttribute('style', 'display: none');
    displayTasks('high');
}