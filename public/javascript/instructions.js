const createProject = require('../../public/images/create-project.gif');
const manageProject = require('../../public/images/manage-project.gif');
const addTask = require('../images/add-task.gif');
const addStatus = require('../images/add-status.gif');
const editTask = require('../images/edit-task.gif');

const dontShow = false;
if (dontShow) {
    closeInstructions();
}
console.log(dontShow);

const itemClassName="carousel-photo";
const items = document.getElementsByClassName(itemClassName);
const totalItems = items.length;
const slide = 0;
const moving = true;

$(document).ready(function() {
  // First image is hard coded in index.html
  const carouselSlides = [
    {
      step: "Set up new project",
      instructions: "Enter project title and select the newly created project",
      img: createProject
    },
    {
        step: "Manage project",
        instructions: "Invite other members to join the project and edit the project's title",
        img: manageProject
    },
    {
      step: "Create tasks",
      instructions: "Add tasks, assign to project member, and provide a status",
      img: addTask
    },
    {
        step: "Manage task status",
        instructions: "Create custom statuses or delete obsolete ones",
        img: addStatus
    },
    {
        step: "Update tasks",
        instructions: "Reassign task to another project member or update task status and title",
        img: editTask
    }
  ]

  carouselSlides.forEach((slide, i) => {
    $('.carousel-content').append(`
    <img class="carousel-photo" src=${slide.img}></img>
    <div class="info-container">
      <div class="row align-items-center justify-content-center">
        <h2 class="display-4 mb-2">${slide.step}</h2>
      </div>
      <div class="row align-items-center justify-content-center"> 
        <h3>${slide.instructions}</h3>
      </div>
    </div>`)
  })
});

function closeInstructions() {
    if (document.querySelector('#instructions').value === "hide") {
        dontShow = true;
    }
    console.log('click');
    console.log(dontShow);

    document.querySelector('.modal-instructions').style.display = 'none';
}

document.querySelector('#hide-howto').addEventListener("click", function() {
    console.log('click');
});