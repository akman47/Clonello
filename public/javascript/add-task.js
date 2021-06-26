async function newTaskFormHandler(event) {
    event.preventDefault();

    task_text = document.querySelector('#new-task').value.trim();
    user_id = document.querySelector('[name="user-menu"]').value.split('-id')[1];
    status_id = document.querySelector('[name="status-menu"]').value.split('-id')[1];

    console.log(task_text, user_id, status_id);

    document.querySelector('.modal-add-task').style.display="none";

    // create task
    const taskResponse = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
            task_text,
            status_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(taskResponse);
    
    if (taskResponse.ok) {
        // get new task id
        const task_id = taskResponse.id;

        // assign task to user
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
        document.location.reload();
        return;
    }
    else {
        alert(taskResponse.statusText);
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