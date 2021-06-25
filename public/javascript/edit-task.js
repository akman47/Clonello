async function editTaskFormHandler(event) {
    event.preventDefault();

    task_id = document.querySelector('#status-menu').getAttribute('data-task-id');
    // fill in element ids
    task_text = document.querySelector('').value;
    status_id = document.querySelector('').getAttribute('data-status-id');

    const response = await fetch(`/api/tasks/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            task_text,
            status_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/single-project');
        return;
    }
    else {
        alert(response.statusText);
    }

}