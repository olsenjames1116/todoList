import { Element, loadHome } from './home.js';
import { loadToday } from './today.js';
import { loadThisWeek } from './thisWeek.js';
import { loadImportant } from './important.js';
import { createFolder } from './folder.js';
import { createTask } from './task.js';
import './style.css';
import deleteIcon from './icons/delete.svg';

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
folder.setEvent('click', createFolder);

export const task = new Element('div.content>ul>li:first-child');
task.setEvent('click', createTask);