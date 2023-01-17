import { Element, loadHeader, loadHome } from "./home.js";
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

function addFolder(){
    pageCover.setAttribute('style', 'display: none;');
    folderPopup.setAttribute('style', 'display: none');

    const folder = new Folder(folderInput.getElement().value);
    folder.createElement(folderArray.getElement(), folder.title);

    const folderSpan = new Element('span');
    folderSpan.createElement(folder.getElement());
    folderSpan.setText(folder.title);

    folderSpan.setEvent('click', (event) => {
        loadFolder(event.target.textContent);
    });

    folder.addIcon(deleteIcon);

    const deleteIconElement = new Element(`${folder.element}>img`);
    deleteIconElement.setEvent('click', () => {
        deleteFolder(deleteIconElement.getElement().parentElement);
    });

    folderArray.pushFolder(folder);
}

function cancelFolder() {
    pageCover.setAttribute('style', 'display: none;');
    folderPopup.setAttribute('style', 'display: none;');
    folderInput.getElement().value = "";
}

function loadFolder(folder) {
    loadHeader(folder);
}

addButton.setEvent('click', addFolder);

cancelButton.setEvent('click', cancelFolder);

