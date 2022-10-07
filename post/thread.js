import '../auth/user.js';

import { getThread, createComment } from '../fetch-utils.js';
import { renderComments } from '../render-utils.js';

const errorDisplay = document.getElementById('error-display');
const postUsername = document.getElementById('post-username');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postText = document.getElementById('post-text');
const commentList = document.getElementById('comment-list');
const commentForm = document.getElementById('comment-form');

let error = [];
let thread = [];

window.addEventListener('load', async () => {
    const searchParameters = new URLSearchParams(location.search);
    const id = searchParameters.get('id');

    if (!id) {
        location.assign('/');
    }

    const response = await getThread(id);
    error = response.error;
    thread = response.data;

    if (error) {
        displayError();
    }
    if (!thread) {
        location.assign('/');
    } else {
        displayThread();
        displayComments();
    }
});

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    const newComment = {
        post_id: thread.id,
        text: formData.get('text'),
    };

    const response = await createComment(newComment);
    error = response.error;
    const comment = response.data;

    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        thread.comments.unshift(comment);
        displayComments();
        commentForm.reset();
    }
});
function displayThread() {
    postUsername.textContent = `u/${thread.username}`;
    postTitle.textContent = thread.title;
    postText.textContent = thread.text;
    if (thread.image_url) {
        postImage.src = thread.image_url;
    }
}

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayComments() {
    commentList.innerHTML = '';
    for (const comment of thread.comments) {
        const commentEl = renderComments(comment);
        commentList.append(commentEl);
    }
}
