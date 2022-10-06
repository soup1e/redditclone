export function renderThread(thread) {
    const li = document.createElement('li');
    li.classList.add('post');
    const a = document.createElement('a');
    // a.href =

    const username = document.createElement('a');
    username.textContent = `u/${thread.username}`;
    username.classList.add('username');

    const h3 = document.createElement('h3');
    h3.textContent = thread.title;

    const p = document.createElement('p');
    p.textContent = thread.text;

    const img = document.createElement('img');
    img.src = thread.img_url;

    if (thread.image_url) {
        a.append(username, h3, img, p);
    } else {
        a.append(username, h3, p);
    }

    li.append(a);

    return li;
}
