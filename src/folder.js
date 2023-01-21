import { Element } from './element.js';
import { loadHeader, loadHome } from './home.js';
import { displayTasks } from './task.js';
import deleteIcon from './icons/delete.svg';
import { task } from './index.js';
import folderIcon from './icons/folder.png';
import storageAvailable from './storage.js';

//Extend Element to take advantage of prototype methods
class Folder extends Element{
    constructor(title){
        super('li');
        this.title = title;
    }
}

//Extend Element to take advantage of prototype elements
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

//Utilize local storage if available
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

//Display a popup with a page cover so the rest of the page cannot be interacted with
export function createFolder() {
    folderPopup.setAttribute('style', 'display: block;');
    pageCover.setAttribute('style', 'display: block;');
}

//Called after the delete icon has been selected
function deleteFolder(element) {
    folderArray.removeFolder(element);

    folderArray.removeChild(element);

    //Utilize local storage if available
    if(storageAvailable('localStorage')){
        storeFolderArray();
    }

    loadHome();
}

//Called after checking that local storage is available to store folder array
function storeFolderArray() {
    //Serialize folder array to make it easier to store and access
    const folderArraySerialized = JSON.stringify(folderArray.array);
    localStorage.setItem("folderArray", folderArraySerialized);
}

//Called after cancelling out on popup and after input has been accessed
function clearInput() {
    pageCover.setAttribute('style', 'display: none;');
    folderPopup.setAttribute('style', 'display: none');
    folderInput.getElement().value = "";
}

function displayFolders(){
    //Clear out element before displaying folders
    folderArray.getElement().innerHTML = '';

    folderArray.array.forEach((folder) => {
        const folderElement = new Element('li');
        //When passing id, utilize title but without spaces to not cause errors in the DOM
        folderElement.createElement(folderArray.getElement(), folder.title.split(' ').join(''));
        folderElement.addIcon(folderIcon);
        
        const folderSpan = new Element('span');
        //When passing id, utilize title but without spaces to not cause errors in the DOM
        folderSpan.createElement(folderElement.getElement(), folder.title.split(' ').join(''));
        folderSpan.setText(folder.title);

        folderSpan.setEvent('click', () => {
            loadFolder(folder.title);
        });

        folderElement.addIcon(deleteIcon);

        //Access the correct element by id selector
        const deleteIconElement = new Element(`${folderElement.element}>img:last-child`);
        deleteIconElement.setEvent('click', () => {
            deleteFolder(deleteIconElement.getElement().parentElement);
        });

    });
}

function addFolder(){
    const folderName = folderInput.getElement().value;

    //Do not allow user to enter an empty folder name by skipping over rest of add folder algorithm
    if(folderName===''){
        alert('Please enter a title for the folder');
        return
    }

    //Do not allow folders with the same name to exist by displaying message and skipping over add folder algorithm
    const folderExists = folderArray.array.find((folder) => {
        return folder.title === folderName;
    });
    if(folderExists!==undefined){
        alert('That folder already exists. Please pick another name.');
        return;
    }

    //Anything that has made it here has a title and that title is not a duplicate
    const folder = new Folder(folderName);
    folderArray.pushFolder(folder);
    clearInput();
    displayFolders();

    //Utilize local storage if available
    if(storageAvailable('localStorage')){
        storeFolderArray(); 
    }
}

//Display appropriate folder name and new task button under each folder
function loadFolder(folder) {
    loadHeader(folder);
    task.setAttribute('style', 'display: block');
    displayTasks(folder);
}

//Listeners for the new folder popup
addButton.setEvent('click', addFolder);
cancelButton.setEvent('click', clearInput);
