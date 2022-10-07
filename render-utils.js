export function renderThread(thread) {
    const li = document.createElement('li');
    li.classList.add('post');
    const a = document.createElement('a');

    a.href = `/post/?id=${thread.id}`;

    const username = document.createElement('a');
    username.textContent = `u/${thread.username}`;
    username.classList.add('username');

    const h3 = document.createElement('h3');
    h3.textContent = thread.title;

    const p = document.createElement('p');
    p.textContent = thread.text;

    const img = document.createElement('img');
    img.src = thread.image_url;

    if (thread.image_url) {
        a.append(username, h3, img, p);
    } else {
        a.append(username, h3, p);
    }

    li.append(a);

    return li;
}

export function renderComments(comment) {
    const li = document.createElement('li');

    const h4 = document.createElement('h4');
    h4.textContent = `u/${comment.username}`;

    const p = document.createElement('p');
    p.textContent = comment.text;

    li.append(h4, p);

    return li;
}
