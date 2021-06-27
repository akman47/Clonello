async function addProjectHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="project-title"]').value;

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
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#create-project-btn').addEventListener('click', addProjectHandler);