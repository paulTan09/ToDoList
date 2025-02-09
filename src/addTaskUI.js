export function closeModal() {
    const addTaskModal = document.querySelector('.modal');
    if (addTaskModal) {
        addTaskModal.classList.remove('show');
        // Wait for animation to complete before removing modal
        setTimeout(() => {
            addTaskModal.remove();
        }, 300); // CSS transition duration
    }
}

export function addTaskUI() {
    console.log("creating modal");
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
                    Task Deadline
                    <input type="text" id="task-date" name="task-date" placeholder="DD-MM-YYYY" required>
                </label>

                <label for="task-priority">
                    Task Priority
                    <select name="priorities" id="task-priority">
                        <option value="" disabled selected> ------ Select Priority ------ </option>
                        <option value="low"> Low Importance </option>
                        <option value="medium"> Medium Importance </option>
                        <option value="high"> High Importance </option>
                    </select>
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

    addTaskModal.addEventListener('click', (event) => {
        if (event.target === addTaskModal) {
            closeModal();
        }
    });


    // Escape key handler
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    
    document.addEventListener('keydown', handleEscape);

    return addTaskModal.querySelector('form'); // Return form to hook into formSubmit.js
}