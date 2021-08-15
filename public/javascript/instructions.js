
if (document.querySelector('#instructions').checked) {
    closeInstructions();
}
else {
    document.querySelector('.modal-instructions').style.display = "block";
}

const itemClassName="carousel-content";
const items = document.getElementsByClassName(itemClassName);
const totalItems = items.length;
let slide = 0;
let moving = true;

function setInitialClasses() {
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
}

function setEventListeners() {
    const next = document.getElementsByClassName('carousel-btn--next')[0];
    const prev = document.getElementsByClassName('carousel-btn--prev')[0];

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
}

function moveNext() {
    if(!moving) {
        // if last slide, reset to 0, else +1
        if (slide === (totalItems-1)) {
            slide = 0;
        }
        else {
            slide++;
        }

        // move carousel to updated slide
        moveCarouselTo(slide);
    }
}

function movePrev() {
    if (!moving) {
        // if first slide, set last slide, else -1
        if (slide === 0) {
            slide = totalItems - 1;  
        }
        else {
            slide--;
        }

        moveCarouselTo(slide);
    }
}

function disableInteraction() {
    // set moving to true for same duration as transition
    moving = true;
    setTimeout (function() {
        moving = false
    }, 500);
}

function moveCarouselTo(slide) {
    // check if carousel is moving, if not, allow interaction
    if (!moving) {
        disableInteraction();
        // update old adjacent slides with new ones
        let newPrevious = slide - 1;
        let newNext = slide + 1;
        let oldPrevious = slide - 2;
        let oldNext = slide + 2;

        if ((totalItems - 1) > 3) {
            // checks and updates if new slides are out of bounds
            if (newPrevious <= 0) {
                oldPrevious = totalItems - 1;
            }
            else if (newNext >= (totalItems - 1)){
                oldNext = 0;
            }

            // checks and updates if slide is at start/end
            if (slide === 0){
                newPrevious = totalItems - 1;
                oldPrevious = totalItems - 2;
                oldNext = slide + 1;
            }
            else if (slide === (totalItems - 1)){
                newPrevious = slide - 1;
                newNext = 0;
                oldNext = 1;
            }

            // reset old next/prev elements to default classes
            items[oldPrevious].className = itemClassName;
            items[oldNext].className = itemClassName;

            // add new classes
            items[newPrevious].className = itemClassName + " prev";
            items[slide].className = itemClassName + " active";
            items[newNext].className = itemClassName + " next";
        }
    }
}

function initCarousel() {
    setInitialClasses();
    setEventListeners();

    // set moving to false so carousel becomes interactive
    moving = false;
}

function closeInstructions() {
    document.querySelector('.modal-instructions').style.display = 'none';
}

document.querySelector('#hide-howto').addEventListener("click", closeInstructions);
initCarousel();