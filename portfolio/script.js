// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    /*---------------------------Responsive Navigation---------------------------*/

    const menuIcon = document.querySelector('.menu_icon');
    const navbar = document.querySelector('.navbar');

    // Toggle the navbar on menu icon click
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('active');
    });

    // Close the navbar when a link is clicked (useful for single-page navigation)
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('active');
            }
        });
    });

    /*---------------------------Sticky Header---------------------------*/

    const headerArea = document.querySelector('.header-area');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // Adjust this value based on when you want the header to become sticky
            headerArea.classList.add('sticky');
        } else {
            headerArea.classList.remove('sticky');
        }
    });

    /*---------------------------ScrollReveal Animations---------------------------*/

    // Initialize ScrollReveal with default settings
    ScrollReveal().reveal('.profile-photo, .profile-text, .about-content, .about-skills, .education, .internship, .project, .contact-form', {
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        easing: 'ease-in-out',
        interval: 200,
        reset: false
    });

    /*---------------------------Typed.js Initialization (Optional)---------------------------*/

    // If you want to add a typing effect, uncomment and customize the following code
    /*
    const typed = new Typed('.typed-text', {
        strings: ["Developer.", "Designer.", "Creator."],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });
    */

    /*---------------------------Contact Form Submission---------------------------*/

    const contactForm = document.querySelector('.contact-content form');
    const msg = document.getElementById('msg');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission

        // Collect form data
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();

        // Simple form validation
        if (!name || !email || !message) {
            msg.innerHTML = '<span style="color: red;">Please fill in all required fields.</span>';
            return;
        }

        // Prepare the data to be sent (you can modify the endpoint as needed)
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        // Send the data using Fetch API (replace 'YOUR_ENDPOINT_URL' with your actual endpoint)
        fetch('YOUR_ENDPOINT_URL', { // Example: 'https://yourserver.com/contact'
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                msg.innerHTML = '<span style="color: green;">Your message has been sent successfully!</span>';
                contactForm.reset(); // Reset the form
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            msg.innerHTML = '<span style="color: red;">There was an error sending your message. Please try again later.</span>';
        });
    });

    /*---------------------------Smooth Scrolling (Optional Enhancement)---------------------------*/

    // If you want smooth scrolling for anchor links (already handled by CSS scroll-behavior: smooth)
    // This is optional if you need more control over the scrolling behavior

    /*
    const allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - headerArea.offsetHeight, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    */

});

// Contact Form Submission Handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Feedback message element
    const msg = document.getElementById('msg');

    // Basic validation
    if (!name || !email || !message) {
        msg.innerHTML = '<span style="color: red;">Please fill in all required fields.</span>';
        return;
    }

    // Prepare form data
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Example POST request to backend (replace 'YOUR_BACKEND_URL' with actual URL)
    fetch('YOUR_BACKEND_URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())  // Parse JSON response
    .then(data => {
        if (data.success) {
            msg.innerHTML = '<span style="color: green;">Your message has been sent successfully!</span>';
            document.getElementById('contactForm').reset(); // Clear form fields
        } else {
            throw new Error(data.error || 'Error occurred while sending message');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        msg.innerHTML = '<span style="color: red;">Failed to send message. Please try again later.</span>';
    });
});
