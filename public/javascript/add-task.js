async function newTaskFormHandler(event) {
    event.preventDefault();

    task_text = document.querySelector('#new-task').value.trim();
    user_id = document.querySelector('#task-user-menu').getAttribute('data-user-id');
    status_id = document.querySelector('#status-menu').getAttribute('data-status-id');

    document.querySelector('.modal-add-task').style.display="none";

    // create task
    const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
            task_text,
            status_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if (response.ok) {
        // get new task id
        task_id = response.id;

        // assign task to user
        const response = await fetch('/api/tasks/assign', {
            method: 'PUT',
            body: JSON.stringify({
                task_id,
                user_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        document.location.reload();
        return;
    }
    else {
        alert(response.statusText);
    }

}

function openTaskModal (event) {
    event.preventDefault();

    document.querySelector('.modal-add-task').style.display="block";
};

function closeTaskModal (event) {
    event.preventDefault();

    document.querySelector('.modal-add-task').style.display="none";
};

document.querySelector('#btn-add-task').addEventListener('click', newTaskFormHandler);
document.querySelector('#open-task-modal').addEventListener('click', openTaskModal);
document.querySelector('#close-task-modal').addEventListener('click', closeTaskModal);