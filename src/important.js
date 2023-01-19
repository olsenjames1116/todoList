import { loadHeader } from './home.js';
import { task } from './index.js';

export function loadImportant() {
    loadHeader('Important');
    task.setAttribute('style', 'display: none');
}