const uses = document.querySelector('.project-list').getAttribute('value');
console.log(uses)

async function addProjectHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="project-title"]').value;
  const user_id = document.querySelector('.new-project-form').getAttribute('data-user-id');

  const response = await fetch(`/api/projects`, {
    method: 'post',
    body: JSON.stringify({
      title
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  

  if (response.ok) {
    getNewProjectId(user_id);
  } else {
    alert(response.statusText);
  }
};

function getNewProjectId(user) {
  const user_id = user;
  fetch('/api/projects')
  .then(response => {
    return response.json()
  })
  .then(data => {
    const newProject = data.length -1;
    const project_id = data[newProject].id;
    assignUser(project_id, user_id);
  });
}

async function assignUser(project, user) {
  const project_id = project;
  const user_id = user;

  const response = await fetch('/api/projects/invite', {
    method: 'PUT',
    body: JSON.stringify({
      project_id,
      user_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    document.location.replace('/dashboard');
  }
  else {
    alert(response.statusText);
  }
}


document.querySelector('#create-project-btn').addEventListener('click', addProjectHandler);