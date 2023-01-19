import { loadHeader } from './home.js';
import { task } from './index.js';

export function loadToday() {
    loadHeader('Today');
    task.setAttribute('style', 'display: none');
}