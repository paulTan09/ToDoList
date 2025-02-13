import './style.css';
import './sidebar.js';
import './formSubmit.js';
import { taskManager } from './taskManager.js';
import './themeSwitch.js';

// Start dashboard on pageload
document.addEventListener('DOMContentLoaded', () => {
    taskManager.currentView = 'dashboard';
    taskManager.refreshTaskGrid();
    
    document.querySelector('nav a').classList.add('active');
});