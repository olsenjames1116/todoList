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
        const index = this.array.findIndex((task) => {
            return task.element === `li#${element.id}`;
        });
        
        this.array.splice(index, 1);
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
const taskPriorityInput = new Element('div.taskPopup>form>div>input[type="radio"]:checked');
const taskArray = new TaskArray([]);
const editTaskPopup = new Element('div.editTaskPopup');
const editTaskTitleInput = new Element('div.editTaskPopup>form>input#editTitle');
const editTaskDescriptionInput = new Element('div.editTaskPopup>form>textarea#editDescription');
const editTaskDateTimeInput = new Element('div.editTaskPopup>form>input#editDateTime');
const editTaskPriorityInput = new Element('div.editTaskPopup>form>div>input[type="radio"]:checked');

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
    const index = taskArray.array.findIndex((task) => {
        return task.element === `li#${editElement}`;
    });

    const editedTask = new Task(editTaskTitleInput.getElement().value, editTaskDescriptionInput.getElement().value, editTaskDateTimeInput.getElement().value, editTaskPriorityInput.getElement().value, document.querySelector('div.content>h2').textContent);
    taskArray.array[index] = editedTask;
    console.table(taskArray.array);
    clearEditTaskInput();
    displayTasks(editedTask.folder);
}

function editTask(task) {
    pageCover.setAttribute('style', 'display: block');
    editTaskPopup.setAttribute('style', 'display: block');
    editTaskTitleInput.getElement().value = task.title;
    editTaskDescriptionInput.getElement().value = task.description;
    editTaskDateTimeInput.getElement().value = task.dateTime;

    console.log(editElement);

    if(task.priority==='none'){
        document.querySelector('div.editTaskPopup>form>div>input#editNone').checked = true;
    } else if(task.priority === 'low'){
        document.querySelector('div.editTaskPopup>form>div>input#editLow').checked = true;
    } else if(task.priority === 'medium') {
        document.querySelector('div.editTaskPopup>form>div>input#editMedium').checked = true;
    } else {
        document.querySelector('div.editTaskPopup>form>div>input#editHigh').checked = true;
    }
}

function deleteTask(element) {
    taskArray.removeTask(element);

    taskArray.removeChild(element);
}

export function displayTasks(folder) {
    let subArray;
    taskArray.getElement().innerHTML = '';

    if(folder!=='All Tasks'){
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

        const editIconElement = new Element(`${listElement.element}>img:nth-child(2)`);
        editIconElement.setEvent('click', () => {
            console.log(editIconElement.getElement().parentElement);
            console.table(taskArray.array);
            editElement = editIconElement.getElement().parentElement.id;
            editTask(item);
        });

        const deleteIconElement = new Element(`${listElement.element}>img:last-child`);
        deleteIconElement.setEvent('click', () => {
            deleteTask(deleteIconElement.getElement().parentElement);
        });
    });
}

let editElement;

addTaskButton.setEvent('click', addTask);
cancelTaskButton.setEvent('click', clearTaskInput);

addEditTaskButton.setEvent('click', addEditTask);
cancelEditTaskButton.setEvent('click', clearEditTaskInput);
