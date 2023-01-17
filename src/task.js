import { Element, loadHeader } from "./home.js";
import { pageCover } from './folder.js';

class Task extends Element {
    constructor(title, description, dateTime, priority){
        super('li');
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.priority = priority;
    }
}

const taskPopup = new Element('div.taskPopup');
const addButton = new Element('div.taskPopup>form>button:nth-last-child(2)');
const cancelButton = new Element('div.taskPopup>form>button:last-child');
const taskTitleInput = new Element('div.taskPopup>form>input#title');
const taskDescriptionInput = new Element('div.taskPopup>form>input#description');
const taskDateTimeInput = new Element('div.taskPopup>form>input#dateTime');
const taskPriorityInput = new Element('div.taskPopup>form>div>input[type="radio"]:checked');

export function createTask() {
    pageCover.setAttribute('style', 'display: block;');
    taskPopup.setAttribute('style', 'display: block;');
}

export function loadTodo() {
    loadHeader('ToDo');
}

function addTask() {
    pageCover.setAttribute('style', 'display: none;');
    taskPopup.setAttribute('style', 'display: none;');

    const task = new Task(taskTitleInput.getElement().value, taskDescriptionInput.getElement().value, taskDateTimeInput.getElement().value, taskPriorityInput.getElement().value);
    
    console.log(`title: ${task.title} description: ${task.description} dateTime: ${task.dateTime} priority: ${task.priority}`);



    // const folder = new Folder(folderInput.getElement().value);
    // folder.createElement(folderArray.getElement(), folder.title);
    // folder.addIcon(deleteIcon);

    // const deleteIconElement = new Element(`${folder.element}>img`);
    // deleteIconElement.setEvent('click', () => {
    //     deleteFolder(deleteIconElement.getElement().parentElement);
    // });

    // folderArray.pushFolder(folder);

    // folder.setEvent('click', () => {
    //     loadArray(folder.title);
    // });
}

function cancelTask() {
    console.log('cancel');
    pageCover.setAttribute('style', 'display: none;');
    taskPopup.setAttribute('style', 'display: none;');
}

addButton.setEvent('click', addTask);
cancelButton.setEvent('click', cancelTask);