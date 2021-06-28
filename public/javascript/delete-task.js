async function deleteTask(event) {
    event.preventDefault();

    task_id = event.target.getAttribute('data-task-id');

    //console.log('click'+ task_id);

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

document.querySelectorAll('.btn-delete').forEach(btn => btn.addEventListener('click', deleteTask));