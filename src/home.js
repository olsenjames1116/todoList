export class Element{
    constructor(element){
        this.element = element;
    }

    getElement(){
        return document.querySelector(this.element);
    }

    createElement(parent, id){
        const newElement = document.createElement(this.element);
        newElement.setAttribute('id', id);
        newElement.textContent = id;
        parent.append(newElement);
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

    getValue(){
        return this.getElement().value;
    }
}

export function loadHeader(headerText){
    const contentHeader = new Element('div.content>h2');
    contentHeader.setText(headerText);
}

export function loadHome(){
    loadHeader('All Tasks');
}