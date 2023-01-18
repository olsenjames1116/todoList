import { Element, loadHeader, loadHome } from './home.js';
import { addTask, addTaskButton, cancelTaskButton, clearTaskInput, createTask, displayTasks } from './task.js';
import { task } from './index.js';
import deleteIcon from './icons/delete.svg';

class Folder extends Element{
    constructor(title){
        super('li');
        this.title = title;
    }
}

class FolderArray extends Element{
    constructor(array){
        super('div.folders>ul');
        this.array = array;
    }

    pushFolder(folder){
        this.array.push(folder);
    }

    removeFolder(element){
        const index = this.array.findIndex((folder) => {
            return folder.element === `li#${element.id}`;
        });
        
        this.array.splice(index, 1);
    }
}

const folderArray = new FolderArray([]);
export const pageCover = new Element('div.pageCover');
const folderInput = new Element('div.folderPopup>form>input');
const folderPopup = new Element('div.folderPopup');
const addButton = new Element('div.folderPopup>form>button:nth-child(4)');
const cancelButton = new Element('div.folderPopup>form>button:last-child');

export function createFolder() {
    folderPopup.setAttribute('style', 'display: block;');
    pageCover.setAttribute('style', 'display: block;');
}

function deleteFolder(element) {
    folderArray.removeFolder(element);

    folderArray.removeChild(element);

    loadHome();
}

function clearInput() {
    pageCover.setAttribute('style', 'display: none;');
    folderPopup.setAttribute('style', 'display: none');
    folderInput.getElement().value = "";
}

function addFolder(){
    const folder = new Folder(folderInput.getElement().value);
    folder.createElement(folderArray.getElement(), folder.title);

    const folderSpan = new Element('span');
    folderSpan.createElement(folder.getElement(), folder.title);
    folderSpan.setText(folder.title);

    folderSpan.setEvent('click', (event) => {
        loadFolder(folder);
    });

    folder.addIcon(deleteIcon);

    const deleteIconElement = new Element(`${folder.element}>img`);
    deleteIconElement.setEvent('click', () => {
        deleteFolder(deleteIconElement.getElement().parentElement);
    });

    folderArray.pushFolder(folder);
    clearInput();
}

function loadFolder(folder) {
    loadHeader(folder.title);
    task.setEvent('click', () => {
        createTask();
        addTaskButton.setEvent('click', () => addTask(folder.element));
        cancelTaskButton.setEvent('click', clearTaskInput);
    }); 
    displayTasks(folder.element);
}

addButton.setEvent('click', addFolder);
cancelButton.setEvent('click', clearInput);
