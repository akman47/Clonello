// // to reassign/edit user for task
// async function assignTaskToUser(event) {
//     event.preventDefault();
    
//     // insert element ids after creating buttons/page
//     user_id = document.querySelector('task-user').getAttribute('data-user-id');
//     task_id = document.querySelector('').getAttribute('data-task-id');

//     const response = await fetch(`/api/tasks/${task_id}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             task_id,
//             user_id
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
    
//     if (response.ok) {
//         document.location.reload();
//         return;
//     }
//     else {
//         alert(response.statusText);
//     }

// }

// // insert button id
// document.querySelector('btn-save-task').addEventListener('click', assignTaskToUser);