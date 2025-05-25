document.addEventListener('DOMContentLoaded', function() {
    // Sample tasks data
    const tasks = [
        //{ id: 1, title: 'Team meeting with marketing', time: '10:00 AM - 11:00 AM', completed: false, priority: 'high' },
      
    ];

    // Render tasks
    function renderTasks() {
        const tasksContainer = document.querySelector('.space-y-4');
        if (!tasksContainer) return;

        tasksContainer.innerHTML = '';
        
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `flex items-start task-card ${task.completed ? 'opacity-70' : ''} p-4 border border-gray-200 rounded-lg mb-3`;
            taskElement.innerHTML = `
                <input type="checkbox" class="mt-1 h-5 w-5 text-primary-600 rounded focus:ring-primary-500" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-800'}">${task.title}</p>
                    ${task.description ? `<p class="text-xs text-gray-600 mt-1 mb-2">${task.description}</p>` : ''}
                    <div class="flex flex-wrap items-center gap-2 mt-1">
                        <p class="text-xs ${task.completed ? 'text-gray-400' : 'text-gray-500'}">
                            <i class="far fa-clock mr-1"></i>${task.time}
                        </p>
                        ${task.date ? `<p class="text-xs ${task.completed ? 'text-gray-400' : 'text-gray-500'}">
                            <i class="far fa-calendar-alt mr-1"></i>${task.date}
                        </p>` : ''}
                        ${task.priority === 'high' ? '<span class="inline-block px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full priority-high">High Priority</span>' : ''}
                        ${task.priority === 'medium' ? '<span class="inline-block px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Medium Priority</span>' : ''}
                        ${task.priority === 'low' ? '<span class="inline-block px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Low Priority</span>' : ''}
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button class="edit-task-btn text-gray-400 hover:text-blue-500 focus:outline-none" data-id="${task.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-task-btn text-gray-400 hover:text-red-500 focus:outline-none" data-id="${task.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
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
                    updateCalendar();
                    addNotification(`Task "${task.title}" marked as ${task.completed ? 'completed' : 'incomplete'}`);
                }
            });
        });

        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-task-btn').forEach(button => {
            button.addEventListener('click', function() {
                const taskId = parseInt(this.getAttribute('data-id'));
                editTask(taskId);
            });
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-task-btn').forEach(button => {
            button.addEventListener('click', function() {
                const taskId = parseInt(this.getAttribute('data-id'));
                deleteTask(taskId);
            });
        });
    }

    // Function to edit a task
    function editTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        // Create modal for editing task
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 class="text-lg font-medium mb-4">Edit Task</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="edit-title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value="${task.title}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="edit-description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3">${task.description || ''}</textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Time</label>
                        <input type="text" id="edit-time" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value="${task.time === 'Completed' || task.time === 'Not assigned' ? '' : task.time}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" id="edit-date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value="${task.date || ''}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Priority</label>
                        <select id="edit-priority" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
                        </select>
                    </div>
                    <div class="flex justify-end space-x-3 mt-4">
                        <button id="cancel-edit" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button id="save-edit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners to modal buttons
        document.getElementById('cancel-edit').addEventListener('click', function() {
            document.body.removeChild(modal);
        });

        document.getElementById('save-edit').addEventListener('click', function() {
            const newTitle = document.getElementById('edit-title').value;
            const newDescription = document.getElementById('edit-description').value;
            const newTime = document.getElementById('edit-time').value || 'Not assigned';
            const newDate = document.getElementById('edit-date').value;
            const newPriority = document.getElementById('edit-priority').value;

            if (newTitle.trim() === '') {
                alert('Title cannot be empty');
                return;
            }

            task.title = newTitle;
            task.description = newDescription;
            task.time = newTime;
            task.date = newDate;
            task.priority = newPriority;

            document.body.removeChild(modal);
            renderTasks();
            updateCalendar();
            showAlert(`Task "${task.title}" updated successfully`, 'success');
            addNotification(`Task "${task.title}" has been updated`);
        });
    }

    // Function to delete a task
    function deleteTask(taskId) {
        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return;

        const taskTitle = tasks[taskIndex].title;
        
        // Confirm deletion
        if (confirm(`Are you sure you want to delete the task "${taskTitle}"?`)) {
            tasks.splice(taskIndex, 1);
            renderTasks();
            updateCalendar();
            showAlert(`Task "${taskTitle}" deleted successfully`, 'success');
            addNotification(`Task "${taskTitle}" has been deleted`);
        }
    }

    // Function to add a new task
    function addNewTask() {
        // Create modal for adding new task
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 class="text-lg font-medium mb-4">Add New Task</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="new-title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter task title">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="new-description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" placeholder="Enter task description"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Time</label>
                        <input type="text" id="new-time" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="e.g. 10:00 AM - 11:00 AM">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" id="new-date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Priority</label>
                        <select id="new-priority" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="low">Low</option>
                            <option value="medium" selected>Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div class="flex justify-end space-x-3 mt-4">
                        <button id="cancel-add" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button id="save-add" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Task</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Set default date to today
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        document.getElementById('new-date').value = formattedDate;

        // Add event listeners to modal buttons
        document.getElementById('cancel-add').addEventListener('click', function() {
            document.body.removeChild(modal);
        });

        document.getElementById('save-add').addEventListener('click', function() {
            const newTitle = document.getElementById('new-title').value;
            const newDescription = document.getElementById('new-description').value;
            const newTime = document.getElementById('new-time').value || 'Not assigned';
            const newDate = document.getElementById('new-date').value;
            const newPriority = document.getElementById('new-priority').value;

            if (newTitle.trim() === '') {
                alert('Title cannot be empty');
                return;
            }

            const newTask = {
                id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
                title: newTitle,
                description: newDescription,
                time: newTime,
                date: newDate,
                completed: false,
                priority: newPriority
            };

            tasks.push(newTask);
            document.body.removeChild(modal);
            renderTasks();
            updateCalendar();
            showAlert(`Task "${newTitle}" added successfully`, 'success');
            addNotification(`New task added: "${newTitle}"`);
        });
    }

    // Function to show alerts
    function showAlert(message, type = 'info') {
        const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
        
        const alert = document.createElement('div');
        alert.className = `alert ${type} p-3 rounded shadow-md mb-2 flex justify-between items-center`;
        alert.innerHTML = `
            <span>${message}</span>
            <button class="close-alert text-gray-500 hover:text-gray-700">×</button>
        `;
        
        alertContainer.appendChild(alert);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alertContainer.contains(alert)) {
                alertContainer.removeChild(alert);
            }
        }, 5000);
        
        // Add close button functionality
        alert.querySelector('.close-alert').addEventListener('click', function() {
            alertContainer.removeChild(alert);
        });
    }
    
    // Create alert container if it doesn't exist
    function createAlertContainer() {
        const container = document.createElement('div');
        container.className = 'alert-container fixed top-4 right-4 w-72 z-50';
        document.body.appendChild(container);
        return container;
    }

    // Function to add notification
    function addNotification(message) {
        const notificationContainer = document.querySelector('.notification-list') || createNotificationContainer();
        
        const notification = document.createElement('div');
        notification.className = 'notification-item p-3 border-b border-gray-200';
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        notification.innerHTML = `
            <div class="flex items-start">
                <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm text-gray-800">${message}</p>
                    <p class="text-xs text-gray-500 mt-1">${timeString}</p>
                </div>
            </div>
        `;
        
        // Add to the top of the list
        if (notificationContainer.firstChild) {
            notificationContainer.insertBefore(notification, notificationContainer.firstChild);
        } else {
            notificationContainer.appendChild(notification);
        }
        
        // Update notification count
        updateNotificationCount();
    }
    
    // Create notification container if it doesn't exist
    function createNotificationContainer() {
        // Check if there's already a notification section
        let container = document.querySelector('.notification-list');
        
        if (!container) {
            // Create a notification section if it doesn't exist
            const notificationSection = document.createElement('div');
            notificationSection.className = 'notification-section';
            notificationSection.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-semibold">Notifications <span class="notification-count bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">0</span></h2>
                    <button class="text-sm text-blue-600 hover:text-blue-800 clear-all-btn">Clear All</button>
                </div>
                <div class="notification-list space-y-2 max-h-80 overflow-y-auto"></div>
            `;
            
            // Find a good place to insert it (e.g., before the tasks section or after the header)
            const mainContent = document.querySelector('main') || document.body;
            mainContent.insertBefore(notificationSection, mainContent.firstChild);
            
            container = notificationSection.querySelector('.notification-list');
            
            // Add event listener to "Clear All" button
            notificationSection.querySelector('.clear-all-btn').addEventListener('click', function() {
                container.innerHTML = '';
                updateNotificationCount();
            });
        }
        
        return container;
    }
    
    // Update notification count
    function updateNotificationCount() {
        const countElement = document.querySelector('.notification-count');
        if (countElement) {
            const count = document.querySelectorAll('.notification-item').length;
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'inline-flex' : 'none';
        }
    }

    // Function to update calendar with tasks
    function updateCalendar() {
        const calendarContainer = document.querySelector('.calendar-container');
        if (!calendarContainer) return;
        
        // Get all calendar day cells
        const dayCells = calendarContainer.querySelectorAll('.calendar-day');
        
        // Clear existing task indicators
        dayCells.forEach(cell => {
            const taskList = cell.querySelector('.day-tasks');
            if (taskList) {
                taskList.innerHTML = '';
            }
        });
        
        // Add tasks to calendar
        tasks.forEach(task => {
            if (task.time && task.time !== 'Not assigned' && task.time !== 'Completed') {
                // Extract date from task time (assuming format like "10:00 AM - 11:00 AM")
                // For this example, we'll just randomly assign tasks to calendar days
                const randomDayIndex = Math.floor(Math.random() * dayCells.length);
                const dayCell = dayCells[randomDayIndex];
                
                let taskList = dayCell.querySelector('.day-tasks');
                if (!taskList) {
                    taskList = document.createElement('div');
                    taskList.className = 'day-tasks mt-1 space-y-1';
                    dayCell.appendChild(taskList);
                }
                
                const taskIndicator = document.createElement('div');
                taskIndicator.className = `text-xs truncate px-1 py-0.5 rounded ${getPriorityClass(task.priority)}`;
                taskIndicator.textContent = task.title;
                taskList.appendChild(taskIndicator);
            }
        });
    }
    
    // Helper function to get priority class for calendar
    function getPriorityClass(priority) {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    // Initialize tasks
    renderTasks();
    
    // Initialize calendar if it exists
    updateCalendar();

    // Add new task button event listener
    const addTaskBtn = document.querySelector('button[data-action="add-task"]');
    
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', addNewTask);
    } else {
        // Create an Add Task button if it doesn't exist
        const tasksHeader = document.querySelector('h2:contains("Tasks")');
        if (tasksHeader) {
            const addButton = document.createElement('button');
            addButton.className = 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700';
            addButton.innerHTML = '<i class="fas fa-plus mr-2"></i>Add New Task';
            addButton.addEventListener('click', addNewTask);
            
            // Create a container for the header and button
            const headerContainer = document.createElement('div');
            headerContainer.className = 'flex justify-between items-center mb-4';
            
            // Replace the header with the container
            tasksHeader.parentNode.insertBefore(headerContainer, tasksHeader);
            headerContainer.appendChild(tasksHeader);
            headerContainer.appendChild(addButton);
        }
    }
});
