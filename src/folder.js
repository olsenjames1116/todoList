import { Element } from './element.js';
import { loadHeader, loadHome } from './home.js';
import { displayTasks } from './task.js';
import deleteIcon from './icons/delete.svg';
import { task } from './index.js';

class Folder extends Element{
    constructor(title, taskButton){
        super('li');
        this.title = title;
    }
}

class FolderArray extends Element{
    constructor(array){
        super('div.folders>ul');
        this.array = array;
    }

    pushFolder(item){
        this.array.push(item);
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
    const folderName = folderInput.getElement().value;
    const folderExists = folderArray.array.find((folder) => {
        return folder.title === folderName;
    });
    if(folderExists!==undefined){
        alert('That folder already exists. Please pick another name.');
        return;
    }

    const folder = new Folder(folderName);
    folder.createElement(folderArray.getElement(), folder.title);

    const folderSpan = new Element('span');
    folderSpan.createElement(folder.getElement(), folder.title);
    folderSpan.setText(folder.title);

    folderSpan.setEvent('click', (event) => {
        loadFolder(folder.title);
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
    loadHeader(folder);
    task.setAttribute('style', 'display: block');
    const folderArray = displayTasks(folder);
    console.log(`${folder} array:`);
    console.table(folderArray);
}

addButton.setEvent('click', addFolder);
cancelButton.setEvent('click', clearInput);
