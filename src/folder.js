import { Element, loadHeader } from "./home.js";

export function loadFolder() {
    loadHeader('Folder');
}

const folderPopup = new Element('div.folderPopup');

export function createFolder() {
    folderPopup.setAttribute('style', 'display: block;');
}

const cancelButton = new Element('div.folderPopup button:last-child');
cancelButton.setEvent('click', cancelFolder);

function cancelFolder() {
    folderPopup.setAttribute('style', 'display: none;');
    const folderInput = new Element('div.folderPopup input');
    folderInput.getElement().value = "";
}