import { Element, loadHeader } from "./home.js";
import { pageCover } from './folder.js';

const taskPopup = new Element('div.taskPopup');
const addButton = new Element('div.taskPopup>form>button:nth-last-child(2)');
const cancelButton = new Element('div.taskPopup>form>button:last-child');

export function createTask() {
    pageCover.setAttribute('style', 'display: block;');
    taskPopup.setAttribute('style', 'display: block;');
}

export function loadTodo() {
    loadHeader('ToDo');
}

function addTask() {
    console.log('add');
    pageCover.setAttribute('style', 'display: none;');
    taskPopup.setAttribute('style', 'display: none;');
}

function cancelTask() {
    console.log('cancel');
    pageCover.setAttribute('style', 'display: none;');
    taskPopup.setAttribute('style', 'display: none;');
}

addButton.setEvent('click', addTask);
cancelButton.setEvent('click', cancelTask);