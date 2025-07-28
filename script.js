document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            console.log("Theme toggle clicked!"); // Debugging: Check if this logs
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
            // Save current theme preference to localStorage
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    } else {
        console.warn("Theme toggle button not found!"); // Debugging: Warn if button missing
    }


    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.remove('dark-theme', 'light-theme'); // Remove default first
        document.body.classList.add(savedTheme + '-theme');
    } else {
        // Default to dark theme if no preference saved
        document.body.classList.add('dark-theme');
    }

    // Digital Clock Functionality
    const digitalClock = document.getElementById('digital-clock');
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
        if (digitalClock) {
            digitalClock.textContent = timeString;
        }
    }
    // Update the clock every second
    setInterval(updateClock, 1000);
    // Initial call to display time immediately
    updateClock();

    // Calendar Functionality
    const calendarDisplay = document.getElementById('calendar');
    function updateCalendar() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        if (calendarDisplay) {
            calendarDisplay.textContent = dateString;
        }
    }
    // Update the calendar every minute or when the page loads
    setInterval(updateCalendar, 60 * 1000); // Update every minute
    updateCalendar(); // Initial call

    // Handle Contact Form Submission (using Formspree as configured in HTML)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default browser form submission

            // The form's 'action' attribute handles the POST request to Formspree.
            // We just need to trigger it. You don't usually need a 'fetch' call here
            // if you're relying on Formspree's direct form submission.
            // For a better user experience and to prevent page reload,
            // you can perform the fetch here instead of relying on default form submission.
            // Let's implement fetch for a smoother experience.

            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Formspree prefers this header for AJAX submissions
                    }
                });

                if (response.ok) {
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset(); // Clear the form
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        alert('Failed to send message: ' + data.errors.map(error => error.message).join(', '));
                    } else {
                        alert('Failed to send message. Please try again later.');
                    }
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred. Please check your internet connection and try again.');
            }
        });
    }
});