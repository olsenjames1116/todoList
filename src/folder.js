import { Element, loadHeader } from "./home.js";
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
const folderInput = new Element('div.folderPopup input');
const folderPopup = new Element('div.folderPopup');
const addButton = new Element('div.folderPopup>form>button:nth-child(4)');
const cancelButton = new Element('div.folderPopup>form>button:last-child');

export function createFolder() {
    folderPopup.setAttribute('style', 'display: block;');
}

function deleteFolder(element) {
    folderArray.removeFolder(element);

    folderArray.removeChild(element);
}

function addFolder(){
    const folder = new Folder(folderInput.getElement().value);
    folder.createElement(folderArray.getElement(), folder.title);
    folder.addIcon(deleteIcon);

    const deleteIconElement = new Element(`${folder.element}>img`);
    deleteIconElement.setEvent('click', () => {
        deleteFolder(deleteIconElement.getElement().parentElement);
    });

    folderArray.pushFolder(folder);

    folder.setEvent('click', () => {
        loadArray(folder.title);
    });
}

function cancelFolder() {
    folderPopup.setAttribute('style', 'display: none;');
    folderInput.getElement().value = "";
}

export function loadArray(title) {
    loadHeader(title);
}

addButton.setEvent('click', addFolder);

cancelButton.setEvent('click', cancelFolder);

