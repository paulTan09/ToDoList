import { format } from 'date-fns';

const allTasks = []; // PS use the application tab in devtools to check the array status

class Task{

    static taskCount = 0;

    constructor(name, description, date, priority) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.createdAt = format(new Date(), 'dd-MM-yyyy | hh:mm a'); //12hr format (i like it more)
        this.id = ++Task.taskCount; // ID tracker
        this.completed = false;
    }
    // Task Adder
    static taskAdder(name, description, date, priority) {
        const newTask = new Task(name, description, date, priority);
        allTasks.push(newTask);
        Task.taskCount++;

        // Save updated tasks to localStorage
        localStorage.setItem('allTasks', JSON.stringify(allTasks));

        console.log(`task added. total: ${Task.taskCount}`);
    }

    // Task Remover
    static taskRemover(id) {
        const taskIndex = allTasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            allTasks.splice(taskIndex, 1);
            Task.taskCount--;
    
            // Update localStorage
            localStorage.setItem('allTasks', JSON.stringify(allTasks));
    
            console.log(`Task removed. Total: ${Task.taskCount}`);
        }
    }

}


// Load tasks from localStorage
const storedTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
storedTasks.forEach(task => {
    allTasks.push(new Task(task.name, task.description, task.date, task.priority));
});


export { Task, allTasks };
