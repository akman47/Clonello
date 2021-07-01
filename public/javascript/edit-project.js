async function editProjectFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('[name="edit-project-title"]').value.trim();
    const project_id = document.querySelector('.add-user-form').getAttribute('data-project-id');

    const response = await fetch(`/api/projects/${project_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
        return;
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('#save-project').addEventListener('click', editProjectFormHandler);