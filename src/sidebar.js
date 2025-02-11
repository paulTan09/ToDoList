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

    // Only append icons to non-dropdown menu items
    if (!link.closest('.dropdown-menu')) {
        appendIcon(link, iconMap[index]);
    }

    link.addEventListener('click', function (e) {
        
        // Prevent default behavior on all non-dropdown menu items
        if (!this.closest('.dropdown-menu')) {
            e.preventDefault();
        }

        // If this link is the theme toggle, exit the handler to avoid adding the active class
        if (this.classList.contains('dropdown-trigger')) {
            return;
        }

        // Only handle active class for main nav items
        if (!this.closest('.dropdown-menu')) {
            
            // Remove active class from all links
            navLinks.forEach((nav) => nav.classList.remove('active'));
            this.classList.add('active');

            // Update current view based on clicked link
            const linkText = this.textContent.toLowerCase();
            if (linkText.includes('completed')) {
                taskManager.currentView = 'completed';
            } else if (linkText.includes('dashboard')) {
                taskManager.currentView = 'dashboard';
            }
            // Add other view cases!!

            // Refresh grid
            taskManager.refreshTaskGrid();
        }

        document.querySelector('.today-sidebar').addEventListener('click', () => {
            taskManager.currentView = 'today';
            taskManager.refreshTaskGrid();
        });
        
        document.querySelector('.this-week-sidebar').addEventListener('click', () => {
            taskManager.currentView = 'this-week';
            taskManager.refreshTaskGrid();
        });
        
        document.querySelector('.this-month-sidebar').addEventListener('click', () => {
            taskManager.currentView = 'this-month';
            taskManager.refreshTaskGrid();
        });
        
    });
});