const taskInput = document.querySelector("#taskInput")
const addTaskBtn = document.querySelector("#addTaskBtn")
const taskList = document.querySelector("#taskList")

const filterAllBtn = document.querySelector("#filterAll")
const filterCompletedBtn = document.querySelector("#filterCompleted")
const filterIncompleteBtn = document.querySelector("#filterIncomplete")
const sortAlphaBtn = document.querySelector("#sortAlpha")

let tasks = []; // Array to store task objects

document.addEventListener("DOMContentLoaded", () => {
    //add task button click event
    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const task = {
            id: Date.now(), // Unique id
            text: taskText,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        taskInput.value = ""; // Clear input field
    });

    //taskList click listener
    taskList.addEventListener("click", (event) => {
        const target = event.target;
        const taskId = target.parentElement.dataset.id;

        if (target.classList.contains("toggle")) {
            tasks = tasks.map(task =>
                task.id == taskId ? { ...task, completed: !task.completed } : task
            );
        } else if (target.classList.contains("delete")) {
            tasks = tasks.filter(task => task.id != taskId);
        }

        renderTasks();
    });

    //implement filtering
    filterAllBtn.addEventListener("click", () => renderTasks("all"));
    filterCompletedBtn.addEventListener("click", () => renderTasks("completed"));
    filterIncompleteBtn.addEventListener("click", () => renderTasks("incomplete"));

    //implement sorting
    sortAlphaBtn.addEventListener("click", () => {
        tasks.sort((a, b) => a.text.localeCompare(b.text));
        renderTasks();
    });
}) // end DOMContentLoaded

//render the tasks (textContent avoid XSS vulnerabilities)
function renderTasks(filter = "all") {
    taskList.innerHTML = ""; // Clear the list before re-rendering

    let filteredTasks = tasks;
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === "incomplete") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.dataset.id = task.id; // Store the task ID in a data attribute
        li.classList.toggle("completed", task.completed);

        // Add buttons for toggling and deleting
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = task.completed ? "Undo" : "Complete";
        toggleBtn.classList.add("toggle");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");

        li.appendChild(toggleBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
} // end renderTasks