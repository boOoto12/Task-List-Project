// Task List Project

// Define UI Variable
const form      = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const taskInput = document.querySelector('#task');
const clearBtn  = document.querySelector('.clear-tasks');
const filter    = document.querySelector('#filter');

// Call load function
loadAllEventListners();

// Load All Event Listners
function loadAllEventListners() {

    // Run Document Loaded Function
    document.addEventListener('DOMContentLoaded', getTasks);
    // Run addTask Function
    form.addEventListener('submit', addTask);

    // Run RemoveTask Function
    taskList.addEventListener('click', removeTask);

    // Run Clear Tasks Fucntion
    clearBtn.addEventListener('click', clearTasks);

    // Run Fiter Tasks Function
    filter.addEventListener('keyup', filterTasks);
}

// [ 6 ] Get Tasks Form LOcal Storage
function getTasks(){

    let tasks;
    
    if(localStorage.getItem('tasks') === null) {

        tasks = [];
    } else {

        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {

        // Create List Item
        const li = document.createElement('li');
        // Add Class
        li.className = 'collection-item';
        // Create a textNode Based on input value and append to li
        li.appendChild(document.createTextNode(task));
        // Create a Link
        const link = document.createElement('a');
        // Add A Class To Link
        link.className = 'delete-item secondary-content'
        // Add I con To Link
        link.innerHTML = "<i class='fa fa-trash'></i>"
        // Append The Link To Li
        li.appendChild(link)

        // Append li to ul
        taskList.appendChild(li)

    })

}

// [ 1 ] Add A Task Function
function addTask(e) {

    // Stop add task function if there's no input value
    if (taskInput.value === '') {

        form.removeEventListener('submit');
    }

    // Create List Item
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create a textNode Based on input value and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create a Link
    const link = document.createElement('a');
    // Add A Class To Link
    link.className = 'delete-item secondary-content'
    // Add I con To Link
    link.innerHTML = "<i class='fa fa-trash'></i>"
    // Append The Link To Li
    li.appendChild(link)

    // Append li to ul
    taskList.appendChild(li)
    
    // store in Local Storage
    storeInLocalStorage(taskInput.value);

    //Clear the input
    taskInput.value = '';

    e.preventDefault();
}

// [ 2 ] Remove Task Function
function removeTask(e) {
    
    if(e.target.className === 'fa fa-trash') {

        // Remove task list
        e.target.parentElement.parentElement.remove();
        
        removeFromLocalStorage(e.target.parentElement.parentElement);
    }

}

// [ 3 ] Clear Tasks Function
function clearTasks() {

    // taskList.innerHTML = '' 

    // faster way
    while(taskList.firstChild) {

        taskList.removeChild(taskList.firstChild);
    }

    clearAllTasksFromLocalStorage();
}



// [ 4 ] Filter Tasks Function
function filterTasks() {

    let listItems = document.querySelectorAll('.collection-item');
    let filterText = filter.value.toLowerCase();
    
    listItems.forEach(function (e) {

        if (e.textContent.indexOf(filterText) != -1) {

            e.style.display = 'block'

        } else {

            e.style.display = 'none'
        }
    });
}

// [ 5 ] Store Tasks In Local Storage
function storeInLocalStorage(task) { 

    let tasks;

    let tasks2;
    
    if(localStorage.getItem('tasks') === null) {

        tasks = [];

    } else {

        tasks = JSON.parse(localStorage.getItem('tasks')) ;
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}


// [ 6 ] Remove Task From Local Storage
function removeFromLocalStorage(taskItem){

    let tasks;
    
    if(localStorage.getItem('tasks') === null) {

        tasks = [];
    } else {

        tasks = JSON.parse(localStorage.getItem('tasks')) ;
    }

    // loop  throgh the tasks array
    tasks.forEach(function(task, index) {

        if(taskItem.textContent === task) {

            tasks.splice(index, 1)
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))

}

// [ 7 ] Clear All Tasks From Local Storage
function clearAllTasksFromLocalStorage() {

    localStorage.removeItem('tasks');

    
}


// TRY TO MAKE AN UNDO FUNCTION ??
