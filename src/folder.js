import { Element, loadHeader } from "./home.js";

const folderInput = new Element('div.folderPopup input');
const addButton = new Element('div.folderPopup>form>button:nth-child(4)');
const cancelButton = new Element('div.folderPopup>form>button:last-child');

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

    pushItem(item){
        this.array.push(item);
    }
}

const folderArray = new FolderArray([]);

export function loadFolder() {
    loadHeader('Folder');
}

const folderPopup = new Element('div.folderPopup');

export function createFolder() {
    folderPopup.setAttribute('style', 'display: block;');
}

function cancelFolder() {
    folderPopup.setAttribute('style', 'display: none;');
    folderInput.getElement().value = "";
}

function addFolder(){
    const folder = new Folder(folderInput.getElement().value);
    folder.createElement(folderArray.getElement(), folder.title);
    folderArray.pushItem(folder);
}

addButton.setEvent('click', addFolder);

cancelButton.setEvent('click', cancelFolder);

