// import { displayTasks } from "./task.js";

export class Element{
    constructor(element){
        this.element = element;
    }

    getElement(){
        return document.querySelector(this.element);
    }

    createElement(parent, id){
        const newElement = document.createElement(this.element);

        if(id!==undefined){
            if(document.getElementById(id)!==null){
                id += Math.floor(Math.random() * 1000000);
            }
            
            newElement.setAttribute('id', id);
    
            this.element += `#${id}`;
        }

        if(parent!==undefined){
            parent.append(newElement);
        }
    }

    addIcon(src){
        const icon = new Image();
        icon.src = src;
        icon.classList.add('deleteIcon');
        this.getElement().append(icon);
    }

    removeChild(child){
        this.getElement().removeChild(child);
    }

    setText(text){
        this.getElement().textContent = text;
    }

    setEvent(event, fn){
        this.getElement().addEventListener(event, fn);
    }

    setAttribute(attribute, value){
        this.getElement().setAttribute(attribute, value);
    }
}

export function loadHeader(headerText){
    const contentHeader = new Element('div.content>h2');
    contentHeader.setText(headerText);
}


export function loadHome(){
    loadHeader('All Tasks');
//     const taskArray = displayTasks('all');
//     console.table(taskArray);
}