// Button function imports
import { addTask } from "./addTask.js";

// Function to append icons
function appendIcon(element, iconClass) {
    const icon = document.createElement('i');
    icon.className = iconClass;
    element.prepend(icon);
}

const navLinks = document.querySelectorAll('aside nav ul li a');

// Define icon classes for each navlink
const iconMap = [
    'fas fa-home',           // Dashboard
    'fas fa-plus-circle',    // Add Task
    'fas fa-calendar',       // All Tasks
    'fas fa-calendar-day',   // Today
    'fas fa-calendar-week',  // This week
    'fas fa-calendar-alt',   // This month
    'fas fa-check-square',   // Completed tasks
];

// Loop through navLinks + append icons
navLinks.forEach((link, index) => {
    appendIcon(link, iconMap[index]);
});

//Add Task button
const addTaskButton = navLinks[1];
if (addTaskButton) {
    addTaskButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevents navigation if it's an <a> tag
        addTask();
    });
}