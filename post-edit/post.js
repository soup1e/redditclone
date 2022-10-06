import '../auth/user.js';
import { createThreads } from '../fetch-utils.js';

const form = document.querySelector('form');
const errorDisplay = document.getElementById('error-display');

let error = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const thread = {
        title: formData.get('title'),
        text: formData.get('text'),
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
