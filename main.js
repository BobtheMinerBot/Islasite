const subListItems = document.querySelectorAll('.sub-list');
const testimonials = document.querySelectorAll('.testimonial');
let currentIndex = 0;
let userInteracted = false; // Track user interaction
let intervalId; // Store the interval ID

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
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

// Debounce scroll event
let isScrolling = false;
window.addEventListener('scroll', () => {
  clearInterval(intervalId); // Stop automatic cycling on scroll
  userInteracted = true; // Set user interaction flag on scroll
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    userInteracted = false; // Reset user interaction flag after scrolling stops
    intervalId = setInterval(startAutomaticCycling, 4000); // Restart automatic cycling
  }, 2000); // Adjust the delay as needed
});

userInteracted = false; // Reset userInteracted flag immediately after scrolling
