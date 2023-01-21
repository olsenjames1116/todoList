import { loadHeader } from './home.js';
import { task } from './index.js';
import { displayTasks } from './task.js';


//Display appropriate header and send today's date to find tasks that match dates within the current weeks
export function loadThisWeek() {
    loadHeader('This Week');
    //Hide the new task button
    task.setAttribute('style', 'display: none');
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    //Add a 0 in front of single digit months to match how user input is stored
    if(month<10){
        month = `0${month}`;
    }
    const day = date.getDate();
    //Make today's date match how user input is stored
    const dateString = `${year}-${month}-${day}`;
    displayTasks(dateString, 'thisWeek');
}