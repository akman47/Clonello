async function editTaskFormHandler(event) {
    event.preventDefault();

    const task_id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1];
    
    const project_id = document.querySelector('.edit-task-form').getAttribute("data-project-id")
    const task_text = document.querySelector('[name="edit-task-text"]').value.trim();
    const status_id = document.querySelector('[name="status-menu"]').value.split('-id')[1];
    const user_id = document.querySelector('[name="user-menu"]').value.split('-id')[1];

    console.log('click'+task_id);
    console.log(task_text, status_id, user_id);

    const taskResponse = await fetch(`/api/tasks/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            task_text,
            status_id,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const userResponse = await fetch('/api/tasks/assign', {
        method: 'PUT',
        body: JSON.stringify({
            task_id,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (taskResponse.ok && userResponse.ok) {
        document.location.replace(`/dashboard/edit/${project_id}`);
        return;
    }
    else {
        alert(taskResponse.statusText, userResponse.statusText);
    }
}

document.querySelector('.btn-save-task').addEventListener('click', editTaskFormHandler);