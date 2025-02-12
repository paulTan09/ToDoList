import { format } from 'date-fns';

const allTasks = []; // PS use the application tab in devtools to check the array status

class Task {

    static taskCount = 0;

    constructor(name, description, date, priority, completed = false, createdOn = null, completedOn = null) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.createdOn = createdOn || format(new Date(), 'PP p'); // for loading the date on pageload OR for creating a new task date
        this.id = ++Task.taskCount; // ID tracker
        this.completed = completed;
        this.completedOn = completedOn;
    }

    // Task Adder
    static taskAdder(name, description, date, priority) {
        const newTask = new Task(name, description, date, priority);
        allTasks.push(newTask);
        Task.taskCount++;

        // Save updated tasks to localStorage
        localStorage.setItem('allTasks', JSON.stringify(allTasks));
    }

    // Task Remover
    static taskRemover(id) {
        const taskIndex = allTasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            allTasks.splice(taskIndex, 1);
            Task.taskCount--;
    
            // Update localStorage
            localStorage.setItem('allTasks', JSON.stringify(allTasks));
        }
    }

}


// Load tasks from localStorage
const storedTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
storedTasks.forEach(task => {
    allTasks.push(new Task(task.name, task.description, task.date, task.priority, task.completed, task.createdOn, task.completedOn));
});


export { Task, allTasks };
