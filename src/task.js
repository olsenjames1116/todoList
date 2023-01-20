import { Element } from './element.js';
import { pageCover } from './folder.js';
import deleteIcon from './icons/delete.svg';
import editIcon from './icons/edit.svg';
import { task } from './index.js';

class Task extends Element {
    constructor(title, description, dateTime, priority, folder, complete){
        super('li');
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.priority = priority;
        this.folder = folder;
        this.complete = complete;
    }
}

class TaskArray extends Element {
    constructor(array) {
        super('div.content>ul');
        this.array = array;
    }

    pushTask(task) {
        this.array.push(task);
    }

    subArray(folder, date) {
        if(date==='today'){
            return this.array.filter((item) => {
                const itemDate = item.dateTime;
                const itemDateString = itemDate.substring(0, 10);
                return itemDateString === folder;
            });
        } else if(date==='thisWeek'){
            return this.array.filter((item) => {
                const itemDate = item.dateTime;
                const itemYearMonth = itemDate.substring(0, 7);
                const folderYearMonth = folder.substring(0, 7);
                const folderDay = parseInt(folder.substring(8, 10));
                const itemDay = parseInt(itemDate.substring(8, 10));
                return (itemYearMonth === folderYearMonth) && (itemDay - folderDay < 7) && (itemDay - folderDay >= 0); 
            });
        } else if(folder==='high') {
            return this.array.filter((item) => {
                return item.priority === folder;
            })
        }
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
const detailsPopup = new Element('div.detailsPopup');
const closeDetailsIcon = new Element('div.detailsPopup>img:first-child');

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
    if(taskTitleInput.getElement().value === ''){
        alert('Please enter a title for the task.');
        return;
    }

    const task = new Task(taskTitleInput.getElement().value, taskDescriptionInput.getElement().value, taskDateTimeInput.getElement().value, taskPriorityInput.getElement().value, document.querySelector('div.content>h2').textContent, false);
    taskArray.pushTask(task);
    clearTaskInput();

    displayTasks(task.folder);
}

function addEditTask() {
    const index = taskArray.array.findIndex((task) => {
        return task.element === `li#${editElement}`;
    });

    const editedTask = new Task(editTaskTitleInput.getElement().value, editTaskDescriptionInput.getElement().value, editTaskDateTimeInput.getElement().value, editTaskPriorityInput.getElement().value, document.querySelector('div.content>h2').textContent, taskArray.array[index].complete);
    taskArray.array[index] = editedTask;
    clearEditTaskInput();
    displayTasks(editedTask.folder);
}

function editTask(task) {
    pageCover.setAttribute('style', 'display: block');
    editTaskPopup.setAttribute('style', 'display: block');
    editTaskTitleInput.getElement().value = task.title;
    editTaskDescriptionInput.getElement().value = task.description;
    editTaskDateTimeInput.getElement().value = task.dateTime;

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

function changeTaskStatus(item, event) {
    if(event.target.checked) {
        item.complete = true;
    }
    console.log(item.complete);
}

function displayDetails(item) {
    pageCover.setAttribute('style', 'display: block;');
    detailsPopup.setAttribute('style', 'display: block;');

    document.querySelector('div.detailsPopup>h2').textContent = item.title;
    document.querySelector('div.detailsPopup>div.folder>span:last-child').textContent = item.folder;
    document.querySelector('div.detailsPopup>div.priority>span:last-child').textContent = item.priority;
    document.querySelector('div.detailsPopup>div.dueDate>span:last-child').textContent = item.dateTime;
    document.querySelector('div.detailsPopup>div.description>p:last-child').textContent = item.description;
}

function closeDetailsPopup() {
    pageCover.setAttribute('style', 'display: none;');
    detailsPopup.setAttribute('style', 'display: none;');
}

export function displayTasks(folder, date) {
    let subArray;
    taskArray.getElement().innerHTML = '';

    if(folder!=='All Tasks'){
        subArray = taskArray.subArray(folder, date);
    } else{
        subArray = taskArray.array;
    }

    subArray.forEach((item) => {
        const listElement = new Element('li');
        listElement.createElement(taskArray.getElement(), item.title.split(' ').join(''));
        item.element = `li#${listElement.getElement().id}`;

        const taskComplete = document.createElement('div');
        const taskCheckbox = document.createElement('input');
        taskCheckbox.addEventListener('change', (event) => {
            changeTaskStatus(item, event);
        });
        taskCheckbox.setAttribute('type', 'checkbox');
        taskCheckbox.id = 'complete';
        taskCheckbox.setAttribute('name', 'complete');
        if(item.complete===true){
            taskCheckbox.checked = true;
        }
        listElement.getElement().append(taskCheckbox);
        
        
        const textElement = document.createElement('span');
        textElement.textContent = item.title;
        listElement.getElement().append(textElement);
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Details';
        listElement.getElement().append(detailsButton);
        detailsButton.addEventListener('click', () => {
            displayDetails(item);
        });

        listElement.addIcon(editIcon);
        listElement.addIcon(deleteIcon);

        const editIconElement = new Element(`${listElement.element}>img:nth-last-child(2)`);
        editIconElement.setEvent('click', () => {
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

closeDetailsIcon.setEvent('click', closeDetailsPopup);
