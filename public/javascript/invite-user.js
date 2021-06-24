async function inviteUser(event) {
    event.preventDefault();

    user_id = document.querySelector('#invite-user-menu').getAttribute('data-user-id');
    
    document.querySelector('.modal-invite-user').style.display="none";
    
    // double check route/might need to redo route like ecommerce product.update and create
    // for user id to be an array since a project can have multipe user_id
    // refer to ecommerce Product Tag and product-routes.js
    const response = await fetch('/api/projects', {
        method: 'PUT',
        body: JSON.stringify({
            user_id
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