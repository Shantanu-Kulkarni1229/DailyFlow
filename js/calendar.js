document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Sample events data
    const events = [
        { date: new Date(currentYear, currentMonth, 5), title: 'Team Meeting', color: 'primary' },
        { date: new Date(currentYear, currentMonth, 9), title: 'Project Deadline', color: 'red' },
        { date: new Date(currentYear, currentMonth, 15), title: 'Client Call', color: 'green' },
        { date: new Date(currentYear, currentMonth, 22), title: 'Review Session', color: 'yellow' }
    ];

    // Render calendar
    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const calendarDays = document.querySelector('.grid.grid-cols-7.gap-1');
        if (!calendarDays) return;

        // Clear previous days
        calendarDays.innerHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'h-8';
            calendarDays.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'h-8 flex items-center justify-center';

            const dayNumber = document.createElement('span');
            dayNumber.className = 'w-6 h-6 flex items-center justify-center text-xs';
            dayNumber.textContent = day;

            // Highlight current day
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayNumber.className += ' rounded-full bg-primary-600 text-white font-medium';
            }

            // Add event indicators
            const dayEvents = events.filter(event => 
                event.date.getDate() === day && 
                event.date.getMonth() === month && 
                event.date.getFullYear() === year
            );

            if (dayEvents.length > 0) {
                dayNumber.className += ' relative';
                const eventIndicator = document.createElement('span');
                eventIndicator.className = `absolute -top-1 -right-1 w-2 h-2 rounded-full bg-${dayEvents[0].color}-500`;
                dayNumber.appendChild(eventIndicator);
            }

            dayElement.appendChild(dayNumber);
            calendarDays.appendChild(dayElement);
        }
    }

    // Initialize calendar
    renderCalendar(currentMonth, currentYear);

    // Navigation buttons
    document.querySelectorAll('[aria-label="Calendar navigation"]').forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, this would change the month and re-render
            showAlert('Calendar navigation would update here in a full implementation', 'info');
        });
    });

    // Day click handler
    document.querySelector('.grid.grid-cols-7.gap-1').addEventListener('click', function(e) {
        if (e.target.classList.contains('text-xs')) {
            const day = parseInt(e.target.textContent);
            showAlert(`You clicked on ${currentMonth + 1}/${day}/${currentYear}. Events would show here in a full implementation.`, 'info');
        }
    });
});


function initCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Update calendar header
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    document.querySelector('.calendar-header h2').textContent = 
        `${monthNames[currentMonth]} ${currentYear}`;
    
    // Generate calendar days
    const daysContainer = document.querySelector('.calendar-days');
    daysContainer.innerHTML = '';
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Add empty cells for days before first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        daysContainer.appendChild(document.createElement('div'));
    }
    
    // Add days
    for (let d = 1; d <= lastDay.getDate(); d++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day cursor-pointer hover:bg-gray-50 p-2';
        dayCell.textContent = d;
        
        // Add click handler
        dayCell.addEventListener('click', () => showTasksForDate(new Date(currentYear, currentMonth, d)));
        
        // Add today's date highlight
        if (d === today.getDate() && currentMonth === today.getMonth()) {
            dayCell.classList.add('bg-primary-100', 'font-medium');
        }
        
        daysContainer.appendChild(dayCell);
    }
}

function showTasksForDate(date) {
    const tasksForDate = tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate.toDateString() === date.toDateString();
    });
    
    // Sort by priority
    tasksForDate.sort((a, b) => b.priority - a.priority);
    
    // Display tasks
    const taskList = document.createElement('div');
    taskList.className = 'space-y-2 mt-2';
    
    tasksForDate.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `p-2 rounded ${getPriorityClass(task.priority)}`;
        taskItem.textContent = task.title;
        taskList.appendChild(taskItem);
    });
    
    // Show in modal or side panel
    const taskDisplay = document.getElementById('task-display');
    taskDisplay.innerHTML = '';
    taskDisplay.appendChild(taskList);
}