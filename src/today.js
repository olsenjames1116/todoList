import { loadHeader } from './home.js';
import { task } from './index.js';

export function loadToday() {
    loadHeader('Today');
    task.setAttribute('style', 'display: none');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${month}-${day}`;
    console.log(dateString);
}