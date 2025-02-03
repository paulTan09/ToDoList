const taskGrid = document.querySelector('#mainGrid');

export const taskManager = {
    addTaskToGrid(task) {
       
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-card');
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p id="task-description-card"> ${task.description} </p>
            <p id="task-deadline-card"> <i>Deadline: </i> ${task.date} </p>
            <p id="task-priority-card"> <i>Priority: </i> ${task.priority} </p>

            <p id="task-status-card">
                <label for="task-status-${task.id}" class="task-checkbox">
                    <input type="checkbox" id="task-status-${task.id}" name="task-status" ${task.status ? 'checked' : ''}>
                    <span class="checkmark"></span> Completed
                </label>
            </p>

            <button class="delete-task"> Delete </button>
        `;
        
        // Delete btn functionality
        taskElement.querySelector('.delete-task').addEventListener('click', () => {
            taskElement.style.animation = "shrinkOut 0.3s ease forwards";
            
            setTimeout(() => {
                taskElement.remove();
                console.log(`Task deleted: ${task.name}`);
            }, 300); // shrink animation duration
        });

        taskGrid.appendChild(taskElement);
    }
};