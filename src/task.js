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
            console.log(item.folder);
            console.log(folder);
           return item.folder === folder;
        });
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

export function createTask() {
    pageCover.setAttribute('style', 'display: block;');
    taskPopup.setAttribute('style', 'display: block;');
}

export function clearTaskInput(){
    pageCover.setAttribute('style', 'display: none;');
    taskPopup.setAttribute('style', 'display: none;');
    taskTitleInput.getElement().value = '';
    taskDescriptionInput.getElement().value = '';
    taskDateTimeInput.getElement().value = '';
    document.querySelector('div.taskPopup>form>div>input#none').checked = true;
}

export function addTask() {
    const task = new Task(taskTitleInput.getElement().value, taskDescriptionInput.getElement().value, taskDateTimeInput.getElement().value, taskPriorityInput.getElement().value, document.querySelector('div.content>h2').textContent);
    
    taskArray.pushTask(task);
    clearTaskInput();

    displayTasks(task.folder);
    console.table(taskArray.array);
}

export function displayTasks(folder) {
    if(folder!=='all'){
        return taskArray.subArray(folder);
    } else{
        return taskArray.array;
    }
}

addTaskButton.setEvent('click', addTask);
cancelTaskButton.setEvent('click', clearTaskInput);