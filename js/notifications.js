document.addEventListener('DOMContentLoaded', function() {
    // Sample notifications data
    const notifications = [
        { id: 1, title: 'Upcoming meeting!', message: 'Team meeting starts in 15 minutes.', time: '10 minutes ago', read: false },
        { id: 2, title: 'Task completed', message: 'You completed "Send weekly report"', time: '2 hours ago', read: true },
        { id: 3, title: 'New message', message: 'You have a new message from Sarah', time: '5 hours ago', read: false }
    ];

    // Initialize notifications
    function initNotifications() {
        const unreadCount = notifications.filter(n => !n.read).length;
        
        // Update notification badge
        const badge = document.querySelector('[aria-label="View notifications"] + span');
        if (badge && unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.classList.remove('hidden');
        } else if (badge) {
            badge.classList.add('hidden');
        }

        // Setup notification button
        const notificationButton = document.querySelector('[aria-label="View notifications"]');
        if (notificationButton) {
            notificationButton.addEventListener('click', function(e) {
                e.preventDefault();
                showNotificationsDropdown();
            });
        }

        // Setup notification toast
        if (notifications.length > 0) {
            setTimeout(() => {
                showNotificationToast(notifications[0]);
            }, 3000);
        }
    }

    // Show notifications dropdown
    function showNotificationsDropdown() {
        // In a real app, this would show a dropdown with all notifications
        showAlert('Notifications dropdown would appear here in a full implementation', 'info');
    }

    // Show notification toast
    function showNotificationToast(notification) {
        const toastContainer = document.querySelector('.fixed.bottom-4.right-4');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'max-w-sm bg-white rounded-lg shadow-lg overflow-hidden animate__animated animate__fadeInUp';
        toast.innerHTML = `
            <div class="p-4">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <i class="fas fa-bell text-yellow-500"></i>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-gray-900">${notification.title}</p>
                        <p class="mt-1 text-sm text-gray-500">${notification.message}</p>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex">
                        <button class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 close-toast">
                            <span class="sr-only">Close</span>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3">
                <div class="text-sm">
                    <a href="#" class="font-medium text-primary-600 hover:text-primary-500">View details</a>
                </div>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Close toast button
        toast.querySelector('.close-toast').addEventListener('click', function() {
            toast.classList.remove('animate__fadeInUp');
            toast.classList.add('animate__fadeOutRight');
            setTimeout(() => {
                toast.remove();
            }, 500);
        });

        // Auto-close after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('animate__fadeInUp');
                toast.classList.add('animate__fadeOutRight');
                setTimeout(() => {
                    toast.remove();
                }, 500);
            }
        }, 5000);
    }

    // Initialize notifications
    initNotifications();
});