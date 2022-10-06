export function renderThread(thread) {
    const li = document.createElement('li');
    const a = document.createElement('a');

    const username = document.createElement('a');
    username.textContent = `r/${thread.user_id}`;

    const h3 = document.createElement('h3');
    h3.textContent = thread.title;

    const p = document.createElement('p');
    p.textContent = thread.text;

    const img = document.createElement('img');
    img.src = thread.img_url;

    a.append(username, h3, img, p);

    li.append(a);

    return li;
}
