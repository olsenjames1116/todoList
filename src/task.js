import { Element, loadHeader } from "./home.js";
import { pageCover } from './folder.js';

class Task extends Element {
    constructor(title, description, dateTime, priority, folder){
        super('li');
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.priority = priority;
        this.folder = folder;
    }
}

class TaskArray {
    constructor(array){
        this.array = array;
    }

    pushTask(task){
        this.array.push(task);
    }

    subArray(folder){
        return this.array.filter((item) => {
           item.folder === folder;
        });
    }
}

class TaskButton extends Element {
    constructor(id){
        super('button');
        this.id = id;
    }
}

class TaskButtonArray {
    constructor(array){
        this.array = array;
    }

    pushTaskButton(taskButton){
        this.array.push(taskButton);
    }
}

export const addTaskButton = new Element('div.taskPopup>form>button:nth-last-child(2)');
export const cancelTaskButton = new Element('div.taskPopup>form>button:last-child');
const taskTitleInput = new Element('div.taskPopup>form>input#title');
const taskDescriptionInput = new Element('div.taskPopup>form>textarea#description');
const taskDateTimeInput = new Element('div.taskPopup>form>input#dateTime');
const taskPopup = new Element('div.taskPopup');
const taskPriorityInput = new Element('div.taskPopup>form>div>input[type="radio"]:checked');
const taskArray = new TaskArray([]);
export const taskButtonArray = new TaskButtonArray([]);

export function createTask() {
    pageCover.setAttribute('style', 'display: block;');
    taskPopup.setAttribute('style', 'display: block;');
}

export function createNewTaskButton(folderId) {
    const taskButton = new TaskButton(folderId);
    taskButton.createElement();
    taskButton.setText('New Task');
    taskButton.setEvent('click', () => addTask(folderId));
    taskButtonArray.pushTaskButton(taskButton);
}

export function loadTaskButton(folderId) {
    const taskButton = taskButtonArray.array.find((taskButton) => {
        return taskButton.id === folderId;
    })
    document.querySelector('div.content').insertBefore(taskButton, document.querySelector('div.content>h2'));
}

export function loadTodo() {
    loadHeader('ToDo');
}

export function clearTaskInput(){
    pageCover.setAttribute('style', 'display: none;');
    taskPopup.setAttribute('style', 'display: none;');
    taskTitleInput.getElement().value = '';
    taskDescriptionInput.getElement().value = '';
    taskDateTimeInput.getElement().value = '';
    document.querySelector('div.taskPopup>form>div>input#none').checked = true;
}

export function addTask(folder) {
    const task = new Task(taskTitleInput.getElement().value, taskDescriptionInput.getElement().value, taskDateTimeInput.getElement().value, taskPriorityInput.getElement().value, folder);
    
    taskArray.pushTask(task);
    clearTaskInput();

    console.table(taskArray.array);
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

export function displayTasks(folder) {
    taskArray.subArray(folder);
}

addTaskButton.setEvent('click', addTask);
cancelTaskButton.setEvent('click', clearTaskInput);