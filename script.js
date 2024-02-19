const addTaskButton = document.querySelector(".add-task-btn");
const taskInput = document.querySelector(".task-input");
const todoColumn = document.getElementById("todo-column");
const columns = document.querySelectorAll(".column");
const dragelement = document.getElementById("dragelement");

addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskContent = document.createElement("p");
        taskContent.textContent = taskText;
        taskContent.classList.add("task-content");

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>'
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            taskElement.remove();
        });

        taskElement.appendChild(taskContent);
        taskElement.appendChild(deleteButton);

        todoColumn.appendChild(taskElement);
        taskInput.value = "";
    }
});


