import './style.css';
import './sidebar.js';
import './formSubmit.js';
import './localStorage.js';
import { taskManager } from './taskManager.js';
import './themeSwitch.js';

console.log('Welcome to your Webpack template!');

// Start dashboard on pageload
document.addEventListener('DOMContentLoaded', () => {
    taskManager.currentView = 'dashboard';
    taskManager.refreshTaskGrid();
    
    document.querySelector('nav a').classList.add('active');
});