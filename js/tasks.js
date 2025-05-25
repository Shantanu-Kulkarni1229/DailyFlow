document.addEventListener('DOMContentLoaded', function() {
    // Sample tasks data
    const tasks = [
        { id: 1, title: 'Team meeting with marketing', time: '10:00 AM - 11:00 AM', completed: false, priority: 'high' },
        { id: 2, title: 'Review project proposal', time: '12:00 PM - 1:00 PM', completed: false, priority: 'medium' },
        { id: 3, title: 'Send weekly report', time: 'Completed', completed: true, priority: 'low' },
        { id: 4, title: 'Prepare presentation', time: '3:00 PM - 4:00 PM', completed: false, priority: 'high' },
        { id: 5, title: 'Call with client', time: '5:00 PM - 5:30 PM', completed: false, priority: 'medium' }
    ];

    // Render tasks
    function renderTasks() {
        const tasksContainer = document.querySelector('.space-y-4');
        if (!tasksContainer) return;

        tasksContainer.innerHTML = '';
        
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `flex items-start task-card ${task.completed ? 'opacity-70' : ''}`;
            taskElement.innerHTML = `
                <input type="checkbox" class="mt-1 h-5 w-5 text-primary-600 rounded focus:ring-primary-500" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}">${task.title}</p>
                    <p class="text-xs ${task.completed ? 'text-gray-400' : 'text-gray-500'}">${task.time}</p>
                    ${task.priority === 'high' ? '<span class="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full priority-high">High Priority</span>' : ''}
                    ${task.priority === 'medium' ? '<span class="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Medium Priority</span>' : ''}
                </div>
                <button class="text-gray-400 hover:text-gray-500 focus:outline-none" data-id="${task.id}">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            `;
            tasksContainer.appendChild(taskElement);
        });

        // Add event listeners to checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskId = parseInt(this.getAttribute('data-id'));
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.completed = this.checked;
                    renderTasks();
                    showAlert(`Task "${task.title}" marked as ${task.completed ? 'completed' : 'incomplete'}`, 'success');
                }
            });
        });
    }

    // Initialize tasks
    renderTasks();

    // Add new task
    const addTaskBtn = document.querySelector('button:contains("Add New Task")');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            const newTaskTitle = prompt('Enter new task title:');
            if (newTaskTitle) {
                const newTask = {
                    id: tasks.length + 1,
                    title: newTaskTitle,
                    time: 'Not assigned',
                    completed: false,
                    priority: 'medium'
                };
                tasks.push(newTask);
                renderTasks();
                showAlert(`Task "${newTaskTitle}" added successfully`,'success');
            }
        });
    }
});