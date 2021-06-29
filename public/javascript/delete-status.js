async function deleteStatus(event) {
    event.preventDefault();

    const status_id = document.querySelector('[name="delete-status-menu"]').value.split('-id')[1];

    document.querySelector('.modal-delete-status').style.display="none";

    const response = await fetch(`/api/status/${status_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

function openDeleteModal (event) {
    event.preventDefault();

    document.querySelector('.modal-delete-status').style.display="block";
};

function closeDeleteModal (event) {
    event.preventDefault();

    document.querySelector('.modal-delete-status').style.display="none";
};

document.querySelector('#btn-delete-status').addEventListener('click', deleteStatus);
document.querySelector('#open-delete-modal').addEventListener('click', openDeleteModal);
document.querySelector('#close-delete-modal').addEventListener('click', closeDeleteModal);
