import { Element, loadHome } from './home.js';
import { loadToday } from './today.js';
import { loadThisWeek } from './thisWeek.js';
import { loadImportant } from './important.js';
import { loadFolder } from './folder.js';
import { loadTodo } from './todo.js';
import './style.css';

loadHome();

const home = new Element('ul.nav>li:first-child');
home.setEvent('click', loadHome);

const today = new Element('ul.nav>li:nth-child(2)');
today.setEvent('click', loadToday);

const thisWeek = new Element('ul.nav>li:nth-child(3)');
thisWeek.setEvent('click', loadThisWeek);

const important = new Element('ul.nav>li:last-child');
important.setEvent('click', loadImportant);

const folder = new Element('div.folders>ul>li');
folder.setEvent('click', loadFolder);

const todo = new Element('div.content>ul>li');
todo.setEvent('click', loadTodo);