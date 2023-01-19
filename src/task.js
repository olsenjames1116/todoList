import { Element } from "./home.js";
import { pageCover } from './folder.js';
import deleteIcon from './icons/delete.svg';

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

class TaskArray extends Element {
    constructor(array){
        super('div.content>ul');
        this.array = array;
    }

    pushTask(task){
        this.array.push(task);
    }

    subArray(folder){
        return this.array.filter((item) => {
           return item.folder === folder;
        });
    }

    removeTask(element) {
        console.table(this.array);
        const index = this.array.findIndex((task) => {
            console.log(task.element);
            console.log(element.id);
            return task.element === `li#${element.id}`;
        });
        
        this.array.splice(index, 1);
        console.table(this.array);
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
}

function deleteTask(element) {
    taskArray.removeTask(element);

    taskArray.removeChild(element);
}

export function displayTasks(folder) {
    let subArray;
    taskArray.getElement().innerHTML = '';

    if(folder!=='all'){
        subArray = taskArray.subArray(folder);
    } else{
        subArray = taskArray.array;
    }

    subArray.forEach((item) => {
        const listElement = new Element('li');
        listElement.createElement(taskArray.getElement(), item.title.split(' ').join(''));
        item.element = `li#${listElement.getElement().id}`;
        
        const textElement = document.createElement('span');
        textElement.textContent = item.title;
        listElement.getElement().append(textElement);
        listElement.addIcon(deleteIcon);

        const deleteIconElement = new Element(`${listElement.element}>img`);
        deleteIconElement.setEvent('click', () => {
            deleteTask(deleteIconElement.getElement().parentElement);
        });
    });

}

addTaskButton.setEvent('click', addTask);
cancelTaskButton.setEvent('click', clearTaskInput);