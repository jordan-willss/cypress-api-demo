async function sendGetRequest() {
    try {
        return new Promise(async (resolve, reject) => {
            const response = await fetch('/api/uuid')
                .then(res => {
                    showSnackbar(`GET request /api/uuid`); 
                    return res.json()
                })
                .then($body => {
                    if ($body.uuid) document.getElementById('uuid-output').innerText = $body.uuid
                })
            resolve(response);
        })
    } catch (error) {
        reject(error);
    }
}

async function sendPostRequest() {
    try {
        return new Promise(async (resolve, reject) => {
            const text = document.getElementById('hex-input').value;

            const body = () => JSON.stringify({
                text,
            });

            const response = await fetch('/api/strToHex', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: body()
            })
                .then(res => {
                    showSnackbar(`POST request /api/strToHex with body: ${body()}`);
                    return res.json();
                })
                .then($body => {
                    if ($body.hex) {
                        const el = document.getElementById('hex-output');
                        el.innerHTML = $body.hex;
                        autoResize(el);
                    }
                })

            resolve(response);
        })
    } catch (error) {
        reject(error);
    }
}

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
}

function autoResize(element) {
    element.style.height = 0;
    element.style.height = (element.scrollHeight) + "px";
}

function showSnackbar(str) {
    const snackbarClose = document.createElement("span");
    snackbarClose.setAttribute('type', 'button');
    snackbarClose.className = 'snackbar-close material-icons material-symbols-outlined';
    snackbarClose.innerHTML = 'close';

    const snackbar = document.createElement("div");
    snackbar.className = 'snackbar';
    snackbar.innerHTML = String(str);
    snackbar.className = 'snackbar show';
    snackbar.append(snackbarClose);

    const container = document.getElementById("snackbar-container");
    container.append(snackbar);

    snackbar.addEventListener('click', () => snackbar.remove());
    snackbarClose.addEventListener('click', () => snackbar.remove());

    setTimeout(() => {
        snackbar.className = snackbar.className.replace('snackbar show', 'snackbar');
        snackbar.remove();
    }, 10000);
}