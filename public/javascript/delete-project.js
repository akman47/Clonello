async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const confirmDelete = confirm('Are you sure you would like to delete this project and all tasks?')
  if (confirmDelete == true) {

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE'
    })
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
    alert(response.statusText);
    }
  } else {
    return;
  }
};

document.querySelector('#delete-project-btn').addEventListener('click', deleteFormHandler);