export function addTask() {
    
    // Create and append modal
    const addTaskModal = document.createElement('div');
    addTaskModal.classList.add('modal');
    addTaskModal.innerHTML = `
        <div class="modal-content">

            <form>
                <label for="task-name">
                    Task Name
                    <input type="text" id="task-name" name="task-name" required>
                </label>

                <label for="task-description">
                    Task Description
                    <textarea id="task-description" name="task-description" required></textarea>
                </label>
            
                <label for="task-date">
                    Task Date
                    <input type="date" id="task-date" name="task-date" required>
                </label>

                <button type="submit">Add Task</button>
            </form>

        </div>
    `;
    document.body.appendChild(addTaskModal);

    // Show modal w/ transition animation
    requestAnimationFrame(() => {
        addTaskModal.classList.add('show');
    });

    function closeModal() {
        addTaskModal.classList.remove('show');
        // Wait for animation to complete before removing modal
        setTimeout(() => {
            addTaskModal.remove();
        }, 300); // CSS transition duration
    }

    addTaskModal.addEventListener('click', (event) => {
        if (event.target === addTaskModal) {
            closeModal();
        }
    });



    // Form submission handler
    const form = addTaskModal.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const taskName = form.querySelector('#task-name').value;
        const taskDescription = form.querySelector('#task-description').value;
        const taskDate = form.querySelector('#task-date').value;

        // Task handling logic
        console.log('Task Details:', { taskName, taskDescription, taskDate });
        
        closeModal();
    });

    // Escape key handler
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);

}