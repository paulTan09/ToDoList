import { format } from 'date-fns';
import { allTasks } from './taskConstructor.js';

const taskGrid = document.querySelector('#mainGrid');
const completedTasksSection = document.querySelector('#completedTasks');

export const taskManager = {
    currentView: 'dashboard', // keep track of current view status

    // Method to filter tasks based on view/button press
    getTasksforView() {
        switch(this.currentView) {
            case 'dashboard':
                return allTasks.filter(task => !task.completed);
            case 'completed':
                return allTasks.filter(task => task.completed);
            // also add more cases for the other sidebar btns
            default:
                return allTasks;
        }
    },

    // Method to refresh the main grid
    refreshTaskGrid() {
        const taskGrid = document.querySelector('#mainGrid');
        taskGrid.innerHTML = ''; // Clear grid

        const tasksToShow = this.getTasksforView();
        tasksToShow.forEach(task => this.addTaskToGrid(task));
    },

    addTaskToGrid(task) {
       
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-card');

        // Format data for display purposes
        const displayDate = format(new Date(task.date), 'PPPP');

        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p id="task-description-card"> ${task.description} </p>
            <p id="task-deadline-card"> <i>Deadline: </i> ${displayDate} </p>
            <p id="task-priority-card"> <i>Priority: </i> ${task.priority} </p>
            <p id="task-createdDate-card"> <i>Created at: </i> ${task.createdAt} </p>

            <p id="task-status-card">
                <label for="task-status-${task.id}" class="task-checkbox">
                    <input type="checkbox" id="task-status-${task.id}" name="task-status" ${task.status ? 'checked' : ''}>
                    <span class="checkmark"></span> Completed
                </label>
            </p>

            <button class="delete-task"> Delete </button>
        `;

        // Handle task completion functinoality
        const checkbox = taskElement.querySelector(`#task-status-${task.id}`);

        // Set initialstate
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked; // Update task state
            localStorage.setItem('allTasks', JSON.stringify(allTasks));
        

            // Handle task animation and view updates
            if ((this.currentView === 'dashboard' && task.completed) || 
                (this.currentView === 'completed' && !task.completed)) {
                // Animate if the task no longer belongs in current view
                taskElement.style.animation = "shrinkOut 0.3s ease forwards";
                setTimeout(() => {
                    taskElement.remove();
                }, 300);
            }
        });
        
        // Delete btn functionality
        taskElement.querySelector('.delete-task').addEventListener('click', () => {
            const index = allTasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                allTasks.splice(index, 1);
                localStorage.setItem('allTasks', JSON.stringify(allTasks));
                
                taskElement.style.animation = "shrinkOut 0.3s ease forwards";
                setTimeout(() => taskElement.remove(), 300);
            }
        });

        taskGrid.appendChild(taskElement);
    },

    moveTaskToCompleted(task, taskElement) {

        // Remove from main dashboard
        taskElement.remove();

         // Add to completed tasks section
        completedTasksSection.appendChild(taskElement);

        // Update task status in allTasks array
        const taskIndex = allTasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
            allTasks[taskIndex].status = true;
            localStorage.setItem('allTasks', JSON.stringify(allTasks));
        }

        console.log(`Task "${task.name}" moved to completed tasks.`);
    }

};