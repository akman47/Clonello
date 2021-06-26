async function editTaskFormHandler(event) {
    event.preventDefault();

    task_id = event.target.getAttribute('data-task-id');
    // fill in element ids
    task_text = document.querySelector('').value;
    status_id = document.querySelector('').getAttribute('data-status-id');

    console.log('click'+task_id);

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

document.querySelectorAll('.btn-edit').forEach(btn => btn.addEventListener('click', editTaskFormHandler));