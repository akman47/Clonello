async function addStatusFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="new-status-text"]').value.trim();

    document.querySelector('.modal-add-status').style.display="none";

    const response = await fetch('/api/status', {
        method: 'POST',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

function openStatusModal (event) {
    event.preventDefault();

    document.querySelector('.modal-add-status').style.display="block";
};

function closeStatusModal (event) {
    event.preventDefault();

    document.querySelector('.modal-add-status').style.display="none";
};


document.querySelector('#btn-add-status').addEventListener('click', addStatusFormHandler);
document.querySelector('#open-status-modal').addEventListener('click', openStatusModal);
document.querySelector('#close-status-modal').addEventListener('click', closeStatusModal);