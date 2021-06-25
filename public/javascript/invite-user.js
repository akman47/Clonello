async function inviteUser(event) {
    event.preventDefault();

    user_id = document.querySelector('#invite-user-menu').getAttribute('data-user-id');
    project_id = document.querySelector('.new-task-form').getAttribute('data-project-id');
    
    document.querySelector('.modal-invite-user').style.display="none";
    
    // double check route after editing models
    const response = await fetch('/api/projects/invite', {
        method: 'PUT',
        body: JSON.stringify({
            user_id,
            project_id
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

function openInviteModal (event) {
    event.preventDefault();

    document.querySelector('.modal-invite-user').style.display="block";
};

function closeInviteModal (event) {
    event.preventDefault();

    document.querySelector('.modal-invite-user').style.display="none";
};

document.querySelector('.btn-invite-user').addEventListener('click', inviteUser);
document.querySelector('.btn-open-invite-modal').addEventListener('click', openInviteModal);
document.querySelectory('.btn-close-invite-modal').addEventListener('click', closeInviteModal);