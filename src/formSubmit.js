import { Task, allTasks } from './taskConstructor.js'; // FINE
import { taskManager } from './taskManager.js'; //FINE
import { addTaskUI, closeModal } from './addTaskUI.js';
import { parse, isValid, format } from 'date-fns';


let form = null;

document.querySelector('.add-task-sidebar').addEventListener('click', () => {
    form = addTaskUI(); // Only create the modal when needed

    if (form) {
        const taskDateInput = form.querySelector('#task-date');
        if (taskDateInput) {
            const today = new Date();
            const formattedToday = format(today, 'dd-MM-yyyy');
            taskDateInput.setAttribute('placeholder', `${formattedToday} or later`);
            taskDateInput.dataset.minDate = format(today, 'yyyy-MM-dd'); // Store dataset for validation
        }
    }
    setupFormListener();
});

function setupFormListener() {
    if (!form) { return undefined }; // Ensures that the setupFormListener func is not called before the form is created

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const taskName = form.querySelector('#task-name').value.trim();
        const taskDescription = form.querySelector('#task-description').value.trim();
        const taskDateInput = form.querySelector('#task-date');
        const taskDate = taskDateInput.value.trim();
        const minDate = taskDateInput.dataset.minDate;
        const taskPriority = form.querySelector('#task-priority').value;

        if (!taskName || !taskDescription || !taskDate || !taskPriority) {
            alert('Please fill out all fields.');
            return;
        }


        /* Date formatting */
            // Parse and validate date
        const parsedDate = parse(taskDate, 'dd-MM-yyyy', new Date());
        if (!isValid(parsedDate)) {
            alert('Invalid date format. Please use DD-MM-YYYY.');
            return;
        }
            // Format date before storing it
        const formattedDate = format(parsedDate, 'yyyy-MM-dd');

            // Prevent past dates
        if (formattedDate < minDate) {
            alert("You can't select a past date.");
            return;
        }
        /* Date formatting END */

        // Create a new task
        Task.taskAdder(taskName, taskDescription, formattedDate, taskPriority);

        // Add task to UI
        taskManager.addTaskToGrid(allTasks[allTasks.length - 1]);

        taskManager.refreshTaskGrid();
        taskManager.updateProgressCircle();

        // Clear form
        form.reset();

        // Close modal
        closeModal();

    });
}