const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const sliderIndicators = document.querySelector('.slider-indicators');
const slideCount = slides.length;
let slideIndex = 0;
let autoSlideInterval; // Variable to hold the auto-slide interval

function updateSlider() {
    sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
    updateIndicators();
}

function goToNextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider();
}

function goToPrevSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider();
}

function createIndicators() {
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.addEventListener('click', () => {
            slideIndex = i;
            updateSlider();
            resetAutoSlide(); // Reset auto-slide when user interacts
        });
        sliderIndicators.appendChild(indicator);
    }
    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => indicator.classList.remove('active'));
    indicators[slideIndex].classList.add('active');
}

function startAutoSlide() {
    autoSlideInterval = setInterval(goToNextSlide, 3000); // Change slide every 3 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval); // Stop auto-slide
    startAutoSlide(); // Restart auto-slide
}

prevButton.addEventListener('click', () => {
    goToPrevSlide();
    resetAutoSlide(); // Reset auto-slide when user interacts
});

nextButton.addEventListener('click', () => {
    goToNextSlide();
    resetAutoSlide(); // Reset auto-slide when user interacts
});

createIndicators(); // Create the indicators on page load
startAutoSlide(); // Start auto-slide on page load

fetch('/Pages/home.json')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.featured-recipe-title').textContent = data.title;
        document.querySelector('.featured-recipe-description').textContent = data.description;
        document.querySelector('.featured-recipe-image img').src = data.image;
        document.querySelector('.featured-recipe-button').href = data.link;
    })
    .catch(error => console.error('Error fetching featured recipe:', error));