const subListItems = document.querySelectorAll('.sub-list');

window.addEventListener('scroll', function() {
  for (const subListItem of subListItems) {
    if (subListItem.getBoundingClientRect().top < window.innerHeight) {
      subListItem.classList.add('animate-sublist');
    }
  }





    // Button click behavior for "Learn More" button
    document.getElementById("learnmorebutton").addEventListener("click", function() {
        fetch("/services")
            .then(response => {
                if (response.ok) {
                    // If the response is successful, navigate to the "/services" page
                    window.location.href = "services"; // Use a relative path
                } else {
                    console.error("Error fetching data from the server.");
                }
            })
            .catch(error => {
                console.error("Error: " + error);
            });
    });

    // Button click behavior for "Contact Us" button
    document.getElementById("ctabutton").addEventListener("click", function() {
        fetch("/contact")
            .then(response => {
                if (response.ok) {
                    // If the response is successful, navigate to the "/contact" page
                    window.location.href = "contact"; // Use a relative path
                } else {
                    console.error("Error fetching data from the server.");
                }
            })
            .catch(error => {
                console.error("Error: " + error);
            });
    });
    const testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;
let userInteracted = false; // Track user interaction
let intervalId; // Store the interval ID

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.classList.add('active');
        } else {
            testimonial.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
}

function startAutomaticCycling() {
    // Check if the user has interacted before cycling
    if (!userInteracted) {
        nextTestimonial();
    }
}

// Automatically cycle through testimonials every 5 seconds
intervalId = setInterval(startAutomaticCycling, 5000);

// Add event listeners to arrow buttons
document.querySelector('.next-arrow').addEventListener('click', () => {
    clearInterval(intervalId); // Stop the automatic cycling when user clicks next
    nextTestimonial();
    userInteracted = true; // Set user interaction flag
    setTimeout(() => {
        userInteracted = false; // Reset user interaction flag after a delay
        intervalId = setInterval(startAutomaticCycling, 5000); // Restart automatic cycling
    }, 1000); // Adjust the delay as needed
});

document.querySelector('.prev-arrow').addEventListener('click', () => {
    clearInterval(intervalId); // Stop the automatic cycling when user clicks previous
    prevTestimonial();
    userInteracted = true; // Set user interaction flag
    setTimeout(() => {
        userInteracted = false; // Reset user interaction flag after a delay
        intervalId = setInterval(startAutomaticCycling, 5000); // Restart automatic cycling
    }, 1000); // Adjust the delay as needed
});

// Show the first testimonial initially
showTestimonial(currentIndex);

// Disable automatic cycling while scrolling
let scrollingTimer;
window.addEventListener('scroll', () => {
    clearInterval(intervalId); // Stop automatic cycling on scroll
    clearTimeout(scrollingTimer); // Clear previous scrolling timer
    userInteracted = true; // Set user interaction flag on scroll
    scrollingTimer = setTimeout(() => {
        userInteracted = false; // Reset user interaction flag after scrolling stops
        intervalId = setInterval(startAutomaticCycling, 4000); // Restart automatic cycling
    }, 1000); // Adjust the delay as needed
});


});
