import '../auth/user.js';
import { createThreads, uploadImage } from '../fetch-utils.js';

const form = document.querySelector('form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

let error = [];

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/reddit.PNG';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const imageFile = formData.get('image');

    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `post/${randomFolder}/${imageFile.name}`;
    let url = await uploadImage('images', imagePath, imageFile);

    if (!imageFile.size) {
        // WOOOOOOOOOO THIS LINES TOOK 1 HOUR AND FIXED ERROR
        url = '';
    }

    const thread = {
        title: formData.get('title'),
        text: formData.get('text'),
        image_url: url,
    };

    const response = await createThreads(thread);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
