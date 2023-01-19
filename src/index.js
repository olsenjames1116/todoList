import { Element, loadHome, loadToday, loadThisWeek, loadImportant, createFolder, createTask } from './aggregator.js';
import './style.css';

export const task = new Element('div.content>button:nth-child(2)');
task.setEvent('click', createTask);

loadHome();

const home = new Element('ul.nav>li:first-child');
home.setEvent('click', loadHome);

const today = new Element('ul.nav>li:nth-child(2)');
today.setEvent('click', loadToday);

const thisWeek = new Element('ul.nav>li:nth-child(3)');
thisWeek.setEvent('click', loadThisWeek);

const important = new Element('ul.nav>li:last-child');
important.setEvent('click', loadImportant);

const folder = new Element('div.folders>button:first-child');
folder.setEvent('click', createFolder);
