import { Element } from './element.js';
import { loadHeader, loadHome } from './home.js';
import { displayTasks } from './task.js';
import deleteIcon from './icons/delete.svg';
import { task } from './index.js';
import folderIcon from './icons/folder.png';
import storageAvailable from './storage.js';

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

export const pageCover = new Element('div.pageCover');
const folderInput = new Element('div.folderPopup>form>input');
const folderPopup = new Element('div.folderPopup');
const addButton = new Element('div.folderPopup>form>button:nth-last-child(2)');
const cancelButton = new Element('div.folderPopup>form>button:last-child');
let folderArray;

if(storageAvailable('localStorage')){
    if(localStorage.getItem("folderArray") !== null){
        folderArray = new FolderArray(JSON.parse(localStorage.getItem("folderArray")));
    } else{
        folderArray = new FolderArray([]);
    }

} else{
    folderArray = new FolderArray([]);
}

displayFolders();

export function createFolder() {
    folderPopup.setAttribute('style', 'display: block;');
    pageCover.setAttribute('style', 'display: block;');
}

function deleteFolder(element) {
    folderArray.removeFolder(element);

    folderArray.removeChild(element);

    if(storageAvailable('localStorage')){
        storeFolderArray();
    }

    loadHome();
}

function storeFolderArray() {
    const folderArraySerialized = JSON.stringify(folderArray.array);
    localStorage.setItem("folderArray", folderArraySerialized);
}

function clearInput() {
    pageCover.setAttribute('style', 'display: none;');
    folderPopup.setAttribute('style', 'display: none');
    folderInput.getElement().value = "";
}

function displayFolders(){
    folderArray.getElement().innerHTML = '';

    folderArray.array.forEach((folder) => {
        const folderElement = new Element('li');
        folderElement.createElement(folderArray.getElement(), folder.title.split(' ').join(''));
        folderElement.addIcon(folderIcon);
        
        const folderSpan = new Element('span');
        folderSpan.createElement(folderElement.getElement(), folder.title.split(' ').join(''));
        folderSpan.setText(folder.title);

        folderSpan.setEvent('click', () => {
            loadFolder(folder.title);
        });

        folderElement.addIcon(deleteIcon);

        const deleteIconElement = new Element(`${folderElement.element}>img:last-child`);
        deleteIconElement.setEvent('click', () => {
            deleteFolder(deleteIconElement.getElement().parentElement);
        });

    });
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
    if(folderName===''){
        alert('Please enter a title for the folder');
        return
    }

    const folder = new Folder(folderName);
    folderArray.pushFolder(folder);
    clearInput();
    displayFolders();

    if(storageAvailable('localStorage')){
        storeFolderArray(); 
    }
}


function loadFolder(folder) {
    loadHeader(folder);
    task.setAttribute('style', 'display: block');
    const folderArray = displayTasks(folder);
}

addButton.setEvent('click', addFolder);
cancelButton.setEvent('click', clearInput);
