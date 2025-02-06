import { taskManager } from './taskManager.js';

// Function to append icons
function appendIcon(element, iconClass) {
    const icon = document.createElement('i');
    icon.className = iconClass;
    element.prepend(icon);
}

const navLinks = document.querySelectorAll('aside nav ul li a');

// Define icon classes for each navlink
const iconMap = [
    'fas fa-home',              // Dashboard
    'fas fa-plus-circle',       // Add Task
    'fas fa-calendar-day',      // Today
    'fas fa-calendar-week',     // This week
    'fas fa-calendar-alt',      // This month
    'fas fa-check-square',      // Completed tasks
    'fas fa-circle-half-stroke' // Theme toggle
];

// Loop through navLinks + append icons
navLinks.forEach((link, index) => {
    appendIcon(link, iconMap[index]);


    // Add click event listener to change active class
    link.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach((nav) => nav.classList.remove('active'));
        this.classList.add('active'); // Add active class to clicked link

        // Update current view based on clicked link
        const linkText = this.querySelector('span').textContent.toLowerCase();
        if (linkText.includes('completed')) {
            taskManager.currentView = 'completed';
        } else if (linkText.includes('dashboard')) {
            taskManager.currentView = 'dashboard';
        }
        // Add other view cases!!

        // Refresh grid
        taskManager.refreshTaskGrid();

    });
});