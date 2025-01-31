import { Task, allTasks } from './taskConstructor.js'; // FINE
import { taskManager } from './taskManager.js'; //FINE
import { addTaskUI, closeModal } from './addTaskUI.js';


let form = null;

document.querySelector('.add-task-sidebar').addEventListener('click', () => {
    form = addTaskUI(); // Only create the modal when needed
    setupFormListener();
});

function setupFormListener() {
    if (!form) { return undefined }; // Ensures that the setupFormListener func is not called before the form is created

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const taskName = form.querySelector('#task-name').value.trim();
        const taskDescription = form.querySelector('#task-description').value.trim();
        const taskDate = form.querySelector('#task-date').value;
        const taskPriority = form.querySelector('#task-priority').value;

        if (!taskName || !taskDescription || !taskDate || !taskPriority) {
            alert('Please fill out all fields.');
            return;
        }
        // Create a new task
        const newTask = new Task(taskName, taskDescription, taskDate, taskPriority);

        // Add task to UI
        taskManager.addTaskToGrid(newTask);

        // Clear form
        form.reset();

        // Close modal
        closeModal();

        console.log(`task created ${allTasks}`); // fix it
    });
}