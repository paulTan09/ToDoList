const allTasks = [];

class Task{

    static taskCount = 0;

    constructor(name, description, date, priority) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.id = ++Task.taskCount; // ID tracker
    }
    // Task Adder
    static taskAdder(name, description, date, priority) {
        const newTask = new Task(name, description, date, priority);
        allTasks.push(newTask);
        Task.taskCount++;
        console.log(`task added. total: ${Task.taskCount}`);
    }

    // Task Remover
    static taskRemover(id) {
        const taskIndex = allTasks.findIndex(task => task.id === id);
        allTasks.splice(taskIndex, 1);
        Task.taskCount--;
        console.log(`task removed. total: ${Task.taskCount}`);
    }

}

export { Task, allTasks };
