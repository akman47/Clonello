async function newTaskFormHandler(event) {
    event.preventDefault();

    task_text = document.querySelector('#new-task').value.trim();
    user_id = document.querySelector('#user-menu').getAttribute('data-user-id');
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
    .then(taskResponse => {

        // get new task id
        task_id = taskResponse.id;

        // assign task to user
        const response = await fetch('/api/tasks/user', {
            method: 'PUT',
            body: JSON.stringify({
                task_id,
                user_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    })
    
    if (response.ok) {
        document.location.reload();
        return;
    }
    else {
        alert(response2.statusText);
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

document.querySelector('.btn-add-task').addEventListener('click', newTaskFormHandler);
document.querySelector('.btn-open-task-modal').addEventListener('click', openTaskModal);
document.querySelector('.btn-close-modal').addEventListener('click', closeTaskModal);