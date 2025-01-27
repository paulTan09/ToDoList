// Function to append icons
function appendIcon(element, iconClass) {
    const icon = document.createElement('i');
    icon.className = iconClass;
    element.prepend(icon);
}

const navLinks = document.querySelectorAll('aside nav ul li a');

// Define icon classes for each navlinks
const iconMap = [
    'fas fa-home',           // Dashboard
    'fas fa-plus-circle',    // Add Task
    'fas fa-calendar',       // All Tasks
    'fas fa-calendar-day',   // Today
    'fas fa-calendar-week',  // This week
    'fas fa-calendar-alt',   // This month
    'fas fa-check-square',   // Completed tasks
    'fas fa-angle-double-right', // Collapse
];

// Loop through navLinks and append icons
navLinks.forEach((link, index) => {
    appendIcon(link, iconMap[index]);
});

const resizeBtn = document.querySelector('[data-resize-btn]');

resizeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.toggle('sb-expanded');
});