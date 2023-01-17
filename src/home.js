export class Element{
    constructor(element){
        this.element = element;
    }

    getElement(){
        return document.querySelector(this.element);
    }

    createElement(parent, id){
        const newElement = document.createElement(this.element);
        newElement.textContent = id;

        if(document.getElementById(id)){
            id += Math.floor(Math.random()*1000000);
        }

        newElement.setAttribute('id', id);

        parent.append(newElement);
        this.element += `#${id}`;
    }

    addIcon(src){
        const icon = new Image();
        icon.src = src;
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
}