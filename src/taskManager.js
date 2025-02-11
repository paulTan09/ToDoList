import { isToday, isThisWeek, isThisMonth, parseISO, format } from 'date-fns';
import { allTasks } from './taskConstructor.js';

const taskGrid = document.querySelector('#mainGrid');
const completedTasksSection = document.querySelector('#completedTasks');
const mainHeader = document.createElement('h1');
mainHeader.classList.add('header-Grid');

export const taskManager = {
    currentView: 'dashboard', // keep track of current view status

    // Method to filter tasks based on view/button press
    getTasksforView() {
        mainHeader.textContent = this.getHeaderText();
        document.querySelector('main').prepend(mainHeader);
    
        let filteredTasks = [];
    
        switch (this.currentView) {
            case 'dashboard':
                filteredTasks = allTasks.filter(task => !task.completed);
                break;
            case 'completed':
                filteredTasks = allTasks.filter(task => task.completed);
                break;
            case 'today':
                filteredTasks = allTasks.filter(task => isToday(parseISO(task.date)));
                break;
            case 'this-week':
                filteredTasks = allTasks.filter(task => 
                    !isToday(parseISO(task.date)) && isThisWeek(parseISO(task.date))
                );
                break;
            case 'this-month':
                filteredTasks = allTasks.filter(task => 
                    !isToday(parseISO(task.date)) && 
                    !isThisWeek(parseISO(task.date)) && 
                    isThisMonth(parseISO(task.date))
                );
                break;
            default:
                // Show all incomplete tasks by default
                filteredTasks = allTasks.filter(task => !task.completed);
        }
    
        // Sort by priority after filtering
        return filteredTasks.sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    },

    getHeaderText() {
        switch (this.currentView) {
            case 'dashboard': return 'Dashboard';
            case 'completed': return 'Completed Tasks';
            case 'today': return 'Today’s Tasks';
            case 'this-week': return 'This Week’s Tasks';
            case 'this-month': return 'This Month’s Tasks';
            default: return 'Tasks';
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
        taskElement.classList.add(`priority-${task.priority}`);

        // Format data for display purposes
        const displayDate = format(new Date(task.date), 'PPPP');

        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p id="task-createdDate-card"> <i>Created at: </i> ${task.createdAt} </p>
            <p id="task-description-card"> ${task.description} </p>
            <p id="task-deadline-card"> <i>Deadline: </i> ${displayDate} </p>
            <p id="task-priority-card"> <i>Priority: </i> ${task.priority} </p>

            <p id="task-status-card">
                <label for="task-status-${task.id}" class="task-checkbox">
                    <input type="checkbox" id="task-status-${task.id}" name="task-status" ${task.status ? 'checked' : ''}>
                    <span class="checkmark"></span> Completed
                </label>
            </p>

            <button class="delete-task"> Delete </button>
        `;

        // Handle task completion functionality
        const checkbox = taskElement.querySelector(`#task-status-${task.id}`);

        // Set initial state
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked; // Update task state
            localStorage.setItem('allTasks', JSON.stringify(allTasks));
        
            if (task.completed) {
                this.showNotification(`"${task.name}" moved to Completed Tasks`);
            } else {
                this.showNotification(`"${task.name}" moved to Dashboard`);
            }
        
            // Remove the task from the current view
            if (task.completed) {
                taskElement.style.animation = "shrinkOut 0.3s ease forwards";
                setTimeout(() => {
                    taskElement.remove();
                    if (this.currentView === 'completed') {
                        this.addTaskToGrid(task); // If in "Completed Tasks", re-add task
                    }
                }, 300);
            } else {
                // Refresh the grid to ensure it's removed from the completed view
                this.refreshTaskGrid();
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

    showNotification(message) {

        // Remove existing notification (if present)
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification popup
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
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