// // Authentication functions
// document.addEventListener('DOMContentLoaded', function() {
//     // Login form submission
//     const loginForm = document.querySelector('form[action="#"]');
//     if (loginForm) {
//         loginForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const email = document.getElementById('email').value;
//             const password = document.getElementById('password').value;
            
//             // Simple validation
//             if (!email || !password) {
//                 showAlert('Please fill in all fields', 'error');
//                 return;
//             }
            
//             // Simulate login (in a real app, this would be an API call)
//             setTimeout(() => {
//                 showAlert('Login successful! Redirecting...', 'success');
//                 // Redirect to dashboard after 2 seconds
//                 setTimeout(() => {
//                     window.location.href = '../index.html';
//                 }, 2000);
//             }, 1000);
//         });
//     }
    
//     // Signup form submission
//     const signupForm = document.querySelector('form[action="#"]');
//     if (signupForm) {
//         signupForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const firstName = document.getElementById('first-name').value;
//             const lastName = document.getElementById('last-name').value;
//             const email = document.getElementById('email').value;
//             const password = document.getElementById('password').value;
//             const confirmPassword = document.getElementById('confirm-password').value;
//             const terms = document.getElementById('terms').checked;
            
//             // Validation
//             if (!firstName || !lastName || !email || !password || !confirmPassword) {
//                 showAlert('Please fill in all fields', 'error');
//                 return;
//             }
            
//             if (password !== confirmPassword) {
//                 showAlert('Passwords do not match', 'error');
//                 return;
//             }
            
//             if (password.length < 8) {
//                 showAlert('Password must be at least 8 characters', 'error');
//                 return;
//             }
            
//             if (!terms) {
//                 showAlert('You must agree to the terms and privacy policy', 'error');
//                 return;
//             }
            
//             // Simulate signup (in a real app, this would be an API call)
//             setTimeout(() => {
//                 showAlert('Account created successfully! Redirecting...', 'success');
//                 // Redirect to dashboard after 2 seconds
//                 setTimeout(() => {
//                     window.location.href = '../index.html';
//                 }, 2000);
//             }, 1000);
//         });
//     }
    
//     // Forgot password form submission
//     const forgotPasswordForm = document.querySelector('form[action="#"]');
//     if (forgotPasswordForm) {
//         forgotPasswordForm.addEventListener('submit', function(e) {
//             e.preventDefault();
//             const email = document.getElementById('email').value;
            
//             if (!email) {
//                 showAlert('Please enter your email address', 'error');
//                 return;
//             }
            
//             // Simulate password reset (in a real app, this would be an API call)
//             setTimeout(() => {
//                 showAlert('Password reset link sent to your email', 'success');
//             }, 1000);
//         });
//     }
// });

// // Show alert message
// function showAlert(message, type) {
//     const alertDiv = document.createElement('div');
//     alertDiv.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-md shadow-lg animate__animated animate__fadeInRight ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`;
//     alertDiv.innerHTML = `
//         <div class="flex items-center">
//             <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'} mr-2"></i>
//             <span>${message}</span>
//         </div>
//     `;
//     document.body.appendChild(alertDiv);
    
//     // Remove alert after 5 seconds
//     setTimeout(() => {
//         alertDiv.classList.remove('animate__fadeInRight');
//         alertDiv.classList.add('animate__fadeOutRight');
//         setTimeout(() => {
//             alertDiv.remove();
//         }, 500);
//     }, 5000);
// }