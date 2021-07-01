async function addStatusFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="new-status-text"]').value.trim();

    document.querySelector('.modal-edit-status').style.display="none";

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
        alert('Status Added');
    }
    else {
        console.log(response.statusText);
        alert('Please enter a new status');
    }
}

async function deleteStatus(event) {
    event.preventDefault();

    const status_id = document.querySelector('[name="delete-status-menu"]').value.split('-id')[1];

    document.querySelector('.modal-edit-status').style.display="none";

    const response = await fetch(`/api/status/${status_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
        alert('Status Deleted');
    }
    else {
        alert(response.statusText);
    }
}

function openStatusModal (event) {
    event.preventDefault();

    document.querySelector('.modal-edit-status').style.display="block";
    document.querySelector('.modal-add-task').style.display="none";
    document.querySelector('.modal-invite-user').style.display="none";
};

function closeStatusModal (event) {
    event.preventDefault();

    document.querySelector('.modal-edit-status').style.display="none";
};

document.querySelector('#btn-add-status').addEventListener('click', addStatusFormHandler);
document.querySelector('#btn-delete-status').addEventListener('click', deleteStatus);
document.querySelector('#open-status-modal').addEventListener('click', openStatusModal);
document.querySelector('#close-status-modal').addEventListener('click', closeStatusModal);