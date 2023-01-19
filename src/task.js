import { Element } from './element.js';
import { pageCover } from './folder.js';
import deleteIcon from './icons/delete.svg';
import editIcon from './icons/edit.svg';

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

const addTaskButton = new Element('div.taskPopup>form>button:nth-last-child(2)');
const cancelTaskButton = new Element('div.taskPopup>form>button:last-child');
const addEditTaskButton = new Element('div.editTaskPopup>form>button:nth-last-child(2)');
const cancelEditTaskButton = new Element('div.editTaskPopup>form>button:last-child');
const taskTitleInput = new Element('div.taskPopup>form>input#title');
const taskDescriptionInput = new Element('div.taskPopup>form>textarea#description');
const taskDateTimeInput = new Element('div.taskPopup>form>input#dateTime');
const taskPopup = new Element('div.taskPopup');
const editTaskPopup = new Element('div.editTaskPopup');
const taskPriorityInput = new Element('div.taskPopup>form>div>input[type="radio"]:checked');
const taskArray = new TaskArray([]);
const editTaskTitleInput = new Element('div.editTaskPopup>form>input#editTitle');
const editTaskDescriptionInput = new Element('div.editTaskPopup>form>textarea#editDescription');
const editTaskDateTimeInput = new Element('div.editTaskPopup>form>input#editDateTime');

export function createTask() {
    pageCover.setAttribute('style', 'display: block;');
    taskPopup.setAttribute('style', 'display: block;');
}

function clearTaskInput(){
    pageCover.setAttribute('style', 'display: none;');
    taskPopup.setAttribute('style', 'display: none;');
    taskTitleInput.getElement().value = '';
    taskDescriptionInput.getElement().value = '';
    taskDateTimeInput.getElement().value = '';
    document.querySelector('div.taskPopup>form>div>input#none').checked = true;
}

function clearEditTaskInput() {
    pageCover.setAttribute('style', 'display: none');
    editTaskPopup.setAttribute('style', 'display: none');
    editTaskTitleInput.getElement().value = '';
    editTaskDescriptionInput.getElement().value = '';
    editTaskDateTimeInput.getElement().value = '';
    document.querySelector('div.editTaskPopup>form>div>input#editNone').checked = true;
}


function addTask() {
    const task = new Task(taskTitleInput.getElement().value, taskDescriptionInput.getElement().value, taskDateTimeInput.getElement().value, taskPriorityInput.getElement().value, document.querySelector('div.content>h2').textContent);
    
    taskArray.pushTask(task);
    clearTaskInput();

    displayTasks(task.folder);
}

function addEditTask() {
    console.log('addEdit');
}

function editTask() {
    pageCover.setAttribute('style', 'display: block');
    editTaskPopup.setAttribute('style', 'display: block');
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
        listElement.addIcon(editIcon);
        listElement.addIcon(deleteIcon);

        console.log(listElement.element);

        const editIconElement = new Element(`${listElement.element}>img:nth-child(2)`);
        editIconElement.setEvent('click', () => {
            editTask();
        });

        const deleteIconElement = new Element(`${listElement.element}>img:last-child`);
        deleteIconElement.setEvent('click', () => {
            deleteTask(deleteIconElement.getElement().parentElement);
        });
    });

}

addTaskButton.setEvent('click', addTask);
cancelTaskButton.setEvent('click', clearTaskInput);

addEditTaskButton.setEvent('click', addEditTask);
cancelEditTaskButton.setEvent('click', clearEditTaskInput);
