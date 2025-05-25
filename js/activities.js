document.addEventListener('DOMContentLoaded', function() {
    const activitiesContainer = document.getElementById('activities-container');
    const viewAllButton = document.getElementById('view-all-activities');

    // Function to create activity item
    function createActivityItem(activity) {
        const item = document.createElement('div');
        item.className = 'p-6 flex items-start hover:bg-gray-50 transition-colors duration-150';
        item.innerHTML = `
            <div class="flex-shrink-0">
                <div class="h-10 w-10 rounded-full ${activity.bgColor} flex items-center justify-center">
                    <i class="${activity.icon} ${activity.textColor}"></i>
                </div>
            </div>
            <div class="ml-4">
                <div class="text-sm font-medium text-gray-900">${activity.title}</div>
                <div class="text-sm text-gray-500">${activity.description}</div>
                <div class="text-xs text-gray-400 mt-1">${activity.timestamp}</div>
            </div>
        `;
        return item;
    }

    // Function to fetch and display activities
    async function fetchActivities() {
        try {
            const response = await fetch('/api/activities');
            const activities = await response.json();
            
            activitiesContainer.innerHTML = '';
            activities.slice(0, 5).forEach(activity => {
                activitiesContainer.appendChild(createActivityItem(activity));
            });
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }

    // View All button click handler
    viewAllButton.addEventListener('click', () => {
        window.location.href = '/activities';
    });

    // Initial fetch and set interval for updates
    fetchActivities();
    setInterval(fetchActivities, 30000); // Update every 30 seconds
});