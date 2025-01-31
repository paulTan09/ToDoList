const taskGrid = document.querySelector('#mainGrid');

export const taskManager = {
    addTaskToGrid(task) {
       
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-card');
        taskElement.innerHTML = `
            <h3>${task.name}</h3>
            <p>${task.description}</p>
            <p>Due: ${task.date}</p>
            <p>Priority: ${task.priority}</p>
            <button class="delete-task">Delete</button>
        `;
        
        // Delete btn functionality
        taskElement.querySelector('.delete-task').addEventListener('click', () => {
            taskElement.remove();
            console.log(`Task deleted: ${task.name}`);
        });

        taskGrid.appendChild(taskElement);
    }
};
