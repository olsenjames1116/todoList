import { loadHeader } from './home.js';
import { task } from './index.js';
import { displayTasks } from './task.js';



export function loadThisWeek() {
    loadHeader('This Week');
    task.setAttribute('style', 'display: none');
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if(month<10){
        month = `0${month}`;
    }
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;
    displayTasks(dateString, 'thisWeek');
}