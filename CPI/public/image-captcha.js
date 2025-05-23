
let selectedImages = [];


const cursorMovements = [];
let timeLeft = 30;


const images = document.querySelectorAll('.captcha-image');
images.forEach(image => {
    image.addEventListener('click', () => {
        image.classList.toggle('selected');
        const isSelected = selectedImages.includes(image.src);

        if (isSelected) {
            selectedImages = selectedImages.filter(src => src !== image.src);
        } else {
            selectedImages.push(image.src);
        }
    });
});


document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const time = Date.now();
    cursorMovements.push({ x, y, time });
});


document.querySelector('.button').addEventListener('click', async () => {
    const correctImages = Array.from(images)
        .filter(img => img.dataset.correct === "true")
        .map(img => img.src);

    const isValid = selectedImages.length === correctImages.length &&
                    selectedImages.every(src => correctImages.includes(src));

    if (isValid) {
        alert('CAPTCHA solved successfully!');

        // Save or send cursor movements after success
        saveMovements();

        // Redirect to another website after a 9-second delay
        setTimeout(() => {
            window.location.href ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrZGYpA_5lydrqN9BvQAd9AUk8DODQyVE5Wg&s"; 
        }, 9000);
    } else {
        alert('Incorrect selection. Please try again.');
        resetCaptcha();
    }
});


function resetCaptcha() {
    window.location.href = "http://localhost:3000";
    selectedImages = [];
    images.forEach(image => image.classList.remove('selected'));
}


const timerElement = document.getElementById('time');
const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    
    if (timeLeft <= 15) {
        timerElement.style.color = 'red';
    }

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('Time is up! Please try again.');
        resetCaptcha();
    }
}, 1000);


function saveMovements() {
    const blob = new Blob([JSON.stringify(cursorMovements, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cursorMovements.json'; 
    a.click();
    URL.revokeObjectURL(url); 
}
