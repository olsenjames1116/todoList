import { loadHeader } from './home.js';
import { task } from './index.js';
import { displayTasks } from './task.js';

export function loadImportant() {
    loadHeader('Important');
    task.setAttribute('style', 'display: none');
    displayTasks('high');
}