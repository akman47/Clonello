async function newTaskFormHandler(event) {
    event.preventDefault();

    const task_text = document.querySelector('#new-task').value.trim();
    const user_id = document.querySelector('[name="user-menu"]').value.split('-id')[1];
    const status_id = document.querySelector('[name="status-menu"]').value.split('-id')[1];
    const project_id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1];

    document.querySelector('.modal-add-task').style.display="none";

    // create task
    const taskResponse = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
            task_text,
            status_id,
            project_id,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if (taskResponse.ok) {
        getNewTaskId(user_id);
    }
    else {
        alert('Task must have a title!');
    }
}

function getNewTaskId(user) {
    const user_id = user;
    fetch('/api/tasks')
    .then(response => {
        return response.json()
    })
    .then(data => {
        const newTask = data.length -1;
        const task_id = data[newTask].id;
        assignUser(task_id, user_id);
    });
}

async function assignUser(task, user) {
    const task_id = task;
    const user_id = user;

    const response = await fetch(`/api/tasks/${task_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            task_id,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

function openTaskModal (event) {
    event.preventDefault();

    document.querySelector('.modal-add-task').style.display="block";
    document.querySelector('.modal-edit-status').style.display="none";
    document.querySelector('.modal-invite-user').style.display="none";
};

function closeTaskModal (event) {
    event.preventDefault();

    document.querySelector('.modal-add-task').style.display="none";
};

document.querySelector('#btn-add-task').addEventListener('click', newTaskFormHandler);
document.querySelector('#open-task-modal').addEventListener('click', openTaskModal);
document.querySelector('#close-task-modal').addEventListener('click', closeTaskModal);
document.querySelectorAll('.btn-edit').forEach(btn => btn.addEventListener('click', function(event) {
    const edit_task_id = event.target.getAttribute('data-task-id');
        window.location.replace(`/dashboard/edit/task/${edit_task_id}`);
}));