async function inviteUser(event) {
    event.preventDefault();

    user_id = document.querySelector('[name="invite-user-menu"]').value.split('-id')[1];
    project_id = document.querySelector('.add-user-form').getAttribute('data-project-id');
    
    console.log("user:", user_id, "project:", project_id);

    document.querySelector('.modal-invite-user').style.display="none";
    
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
        document.location.reload();
        return;
    }
    else {
        alert(response.statusText);
    }
}

function openInviteModal (event) {
    event.preventDefault();

    document.querySelector('.modal-invite-user').style.display="block";
    document.querySelector('.modal-add-status').style.display="none";
    document.querySelector('.modal-delete-status').style.display="none";
    document.querySelector('.modal-add-task').style.display="none";
};

function closeInviteModal (event) {
    event.preventDefault();

    document.querySelector('.modal-invite-user').style.display="none";
};

document.querySelector('.btn-invite-user').addEventListener('click', inviteUser);
document.querySelector('.btn-open-invite-modal').addEventListener('click', openInviteModal);
document.querySelector('.btn-close-invite-modal').addEventListener('click', closeInviteModal);