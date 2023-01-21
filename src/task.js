import { Element } from './element.js';
import { pageCover } from './folder.js';
import deleteIcon from './icons/delete.svg';
import editIcon from './icons/edit.svg';
import storageAvailable from './storage.js';

//Extend Element to take advantage of prototype methods
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

//Extend Element to take advantage of prototype methods
class TaskArray extends Element {
    constructor(array) {
        super('div.content>ul');
        this.array = array;
    }

    pushTask(task) {
        this.array.push(task);
    }

    subArray(folder, date) {
        //Date value is passed form today module when selected
        if(date==='today'){
            return this.array.filter((item) => {
                const itemDate = item.dateTime;
                const itemDateString = itemDate.substring(0, 10);
                return itemDateString === folder;
            });
        //Date value is passed from this week module when selected
        } else if(date==='thisWeek'){
            return this.array.filter((item) => {
                const itemDate = item.dateTime;
                const itemYearMonth = itemDate.substring(0, 7);
                const folderYearMonth = folder.substring(0, 7);
                const folderDay = parseInt(folder.substring(8, 10));
                const itemDay = parseInt(itemDate.substring(8, 10));
                return (itemYearMonth === folderYearMonth) && (itemDay - folderDay < 7) && (itemDay - folderDay >= 0); 
            });
        //Folder value of high is passed from important 
        } else if(folder==='high') {
            return this.array.filter((item) => {
                return item.priority === folder;
            })
        }

        //Will be called when a user generated folder is passed
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
const editTaskPopup = new Element('div.editTaskPopup');
const editTaskTitleInput = new Element('div.editTaskPopup>form>input#editTitle');
const editTaskDescriptionInput = new Element('div.editTaskPopup>form>textarea#editDescription');
const editTaskDateTimeInput = new Element('div.editTaskPopup>form>input#editDateTime');
const editTaskPriorityInput = new Element('div.editTaskPopup>form>div>input[type="radio"]:checked');
const detailsPopup = new Element('div.detailsPopup');
const closeDetailsIcon = new Element('div.detailsPopup>img:first-child');
let editElement;
let taskArray;

//Utilize local storage if available
if(storageAvailable('localStorage')){
    if(localStorage.getItem("taskArray") !== null){
        taskArray = new TaskArray(JSON.parse(localStorage.getItem("taskArray")));
    } else{
        taskArray = new TaskArray([]);
    }

} else{
    taskArray = new TaskArray([]);
}

//Display a popup with a page cover so the rest of the page cannot be interacted with
export function createTask() {
    pageCover.setAttribute('style', 'display: block;');
    taskPopup.setAttribute('style', 'display: block;');
}

//Clear user input when a popup is canceled or after user info has been stored
function clearTaskInput(){
    pageCover.setAttribute('style', 'display: none;');
    taskPopup.setAttribute('style', 'display: none;');
    taskTitleInput.getElement().value = '';
    taskDescriptionInput.getElement().value = '';
    taskDateTimeInput.getElement().value = '';
    document.querySelector('div.taskPopup>form>div>input#none').checked = true;
}

/* A separate popup exists when a user wishes to edit info. 
This will clear user input when popup is canceled or after user info has been stored. */
function clearEditTaskInput() {
    pageCover.setAttribute('style', 'display: none');
    editTaskPopup.setAttribute('style', 'display: none');
    editTaskTitleInput.getElement().value = '';
    editTaskDescriptionInput.getElement().value = '';
    editTaskDateTimeInput.getElement().value = '';
    document.querySelector('div.editTaskPopup>form>div>input#editNone').checked = true;
}

//Creates and adds a new task from the task popup
function addTask() {

    //Do not allow user to enter an empty task name by skipping over rest of add task algorithm
    if(taskTitleInput.getElement().value === ''){
        alert('Please enter a title for the task.');
        return;
    }

    //Anything that has made it this far has title input
    const task = new Task(taskTitleInput.getElement().value, taskDescriptionInput.getElement().value, taskDateTimeInput.getElement().value, taskPriorityInput.getElement().value, document.querySelector('div.content>h2').textContent, false);
    taskArray.pushTask(task);
    clearTaskInput();

    displayTasks(task.folder);

    //Utilize local storage if available
    if(storageAvailable('localStorage')){
        storeTaskArray(); 
    }
}

//Updates existing input from the edit task popup
function addEditTask() {
    //Search the task array for the index of the selected task to edit
    const index = taskArray.array.findIndex((task) => {
        return task.element === `li#${editElement}`;
    });

    const editedTask = new Task(editTaskTitleInput.getElement().value, editTaskDescriptionInput.getElement().value, editTaskDateTimeInput.getElement().value, editTaskPriorityInput.getElement().value, document.querySelector('div.content>h2').textContent, taskArray.array[index].complete);
    //Replace the existing task with the edited task
    taskArray.array[index] = editedTask;
    clearEditTaskInput();
    displayTasks(editedTask.folder);

    //Utilize local storage if available
    if(storageAvailable('localStorage')){
        storeTaskArray(); 
    }
}

//Display edit task popup with stored info
function editTask(task) {
    pageCover.setAttribute('style', 'display: block');
    editTaskPopup.setAttribute('style', 'display: block');
    editTaskTitleInput.getElement().value = task.title;
    editTaskDescriptionInput.getElement().value = task.description;
    editTaskDateTimeInput.getElement().value = task.dateTime;

    //Check the correct priority radio button given the stored info
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

//Called after checking that local storage is available to store task array
function storeTaskArray() {
    //Serialize folder array to make it easier to store and access
    const taskArraySerialized = JSON.stringify(taskArray.array);
    localStorage.setItem("taskArray", taskArraySerialized);

}

//Called after the delete icon has been selected
function deleteTask(element) {
    taskArray.removeTask(element);

    taskArray.removeChild(element);

    //Utilize local storage if available
    if(storageAvailable('localStorage')){
        storeTaskArray();
    }
}

//Called after a user has selected the checkbox next to a task
function changeTaskStatus(item, event) {
    if(event.target.checked) {
        item.complete = true;
    } else {
        item.complete = false;
    }

    //Utilize local storage if available
    if(storageAvailable('localStorage')){
        storeTaskArray(); 
    }
}

//Called after the user has selected the details button under a task
function displayDetails(item) {
    pageCover.setAttribute('style', 'display: block;');
    detailsPopup.setAttribute('style', 'display: block;');

    document.querySelector('div.detailsPopup>h2').textContent = item.title;
    document.querySelector('div.detailsPopup>div.folder>span:last-child').textContent = item.folder;
    document.querySelector('div.detailsPopup>div.priority>span:last-child').textContent = item.priority;
    document.querySelector('div.detailsPopup>div.dueDate>span:last-child').textContent = item.dateTime;
    document.querySelector('div.detailsPopup>div.description>p:last-child').textContent = item.description;
}

//Called after the exit icon on the details popup has been selected
function closeDetailsPopup() {
    pageCover.setAttribute('style', 'display: none;');
    detailsPopup.setAttribute('style', 'display: none;');
}

export function displayTasks(folder, date) {
    let subArray;
    //Clear out element before adding tasks
    taskArray.getElement().innerHTML = '';

    //Displays all tasks unless there is a specific folder passed
    if(folder!=='All Tasks'){
        subArray = taskArray.subArray(folder, date);
    } else{
        subArray = taskArray.array;
    }

    subArray.forEach((item) => {
        const listElement = new Element('li');
        //When passing id, utilize title but without spaces to not cause errors in the DOM
        listElement.createElement(taskArray.getElement(), item.title.split(' ').join(''));
        item.element = `li#${listElement.getElement().id}`;

        //Create a checkbox for each task that will track when the task has been completed
        const taskCheckbox = document.createElement('input');
        taskCheckbox.addEventListener('change', (event) => {
            changeTaskStatus(item, event);
        });
        taskCheckbox.setAttribute('type', 'checkbox');
        taskCheckbox.id = 'complete';
        taskCheckbox.setAttribute('name', 'complete');
        //Check box if has been stored with a check value previously
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

        //Access the correct element by id selector
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

//Listeners for new task popup
addTaskButton.setEvent('click', addTask);
cancelTaskButton.setEvent('click', clearTaskInput);

//Listeners for edit task popup
addEditTaskButton.setEvent('click', addEditTask);
cancelEditTaskButton.setEvent('click', clearEditTaskInput);

//Listener for details popup
closeDetailsIcon.setEvent('click', closeDetailsPopup);
