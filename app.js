/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getThreads } from './fetch-utils.js';
import { renderThread } from './render-utils.js';
/* Get DOM Elements */
const threadList = document.getElementById('thread-list');
const errorDisplay = document.getElementById('error-display');
/* State */
let error = [];
let threads = [];
/* Events */
window.addEventListener('load', async () => {
    const response = await getThreads();
    error = response.error;
    threads = response.data;

    if (error) {
        displayError();
    }

    if (threads) {
        displayThreads();
    }
});
/* Display Functions */
function displayThreads() {
    threadList.innerHTML = '';

    for (const thread of threads) {
        const threadEl = renderThread(thread);
        threadList.append(threadEl);
    }
}

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
