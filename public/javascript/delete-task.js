async function deleteTask(event) {
    event.preventDefault();

    task_id = document.querySelector('').getAttribute('data-task-id');

    const response = await fetch(`/api/tasks/${task_id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
        return;
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('').addEventListener('click', deleteTask);