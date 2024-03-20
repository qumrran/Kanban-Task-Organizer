import {
	addTaskToState,
	deleteTaskfromStateById,
	clearAllTasksFromState,
	updateTaskStateInColumn,
} from './state.js';

const addTaskButton = document.querySelector('.add-task-btn');
const taskInput = document.querySelector('.task-input');
const todoColumn = document.querySelector('#todo-column');
const columns = document.querySelectorAll('.column');
const clearAllTasks = document.querySelector('.clear-tasks-btn');

// Funkcja tworzenia i usuwania nowego zadania
function createTask(taskText) {
	const taskElement = document.createElement('div');
	taskElement.classList.add('task');

	const taskContent = document.createElement('p');
	taskContent.textContent = taskText;
	taskContent.classList.add('task-content');

	const deleteButton = document.createElement('button');
	deleteButton.innerHTML = '<i class="fas fa-minus-circle"></i>';
	deleteButton.classList.add('delete-button');

	const taskId = Date.now().toString();
	taskElement.setAttribute('id', taskId);
	taskElement.appendChild(taskContent);
	taskElement.appendChild(deleteButton);

	addTaskToState(taskId, taskText);

	return taskElement;
}

// Obsługa kliknięcia na przyciskach usuwania
columns.forEach((column) => {
	column.addEventListener('click', (event) => {
		const deleteButton = event.target.closest('.delete-button');
		if (deleteButton) {
			const taskToDelete = deleteButton.closest('.task');
			const taskId = taskToDelete.id;
			if (taskId) {
				deleteTaskfromStateById(taskId);
				taskToDelete.remove();
				updateCounters();
			}
		}
	});
});

// Funkcja, która sprawia, że element jest przeciągalny
function makeTaskDraggable(taskElement) {
	taskElement.draggable = true;

	taskElement.addEventListener('dragstart', () => {
		taskElement.classList.add('is-dragging');
	});

	taskElement.addEventListener('dragend', () => {
		taskElement.classList.remove('is-dragging');
	});
}

// Obsługa przeciągania i upuszczania elementów
columns.forEach((zone) => {
	zone.addEventListener('dragover', (e) => {
		e.preventDefault();

		const draggingTask = document.querySelector('.is-dragging');

		if (draggingTask && draggingTask.parentNode !== zone) {
			zone.appendChild(draggingTask);

			const taskId = draggingTask.id;
			const taskText = draggingTask.querySelector('.task-content').textContent;

			updateTaskStateInColumn(zone, taskId, taskText);
			updateCounters();
		}

		const mouseY = e.clientY;
		const bottomTask = insertAboveTask(zone, mouseY);
		const curTask = document.querySelector('.is-dragging');

		if (!bottomTask) {
			zone.appendChild(curTask);
		} else {
			zone.insertBefore(curTask, bottomTask);
		}
	});
});

// Obsługa dodawania nowego zadania
addTaskButton.addEventListener('click', () => {
	const taskText = taskInput.value.trim();
	if (taskText !== '') {
		const taskElement = createTask(taskText);
		todoColumn.appendChild(taskElement);
		taskInput.value = '';
		makeTaskDraggable(taskElement);
		updateCounters();
	}
});

// Funkcja do określania pozycji myszy względem zadań
const insertAboveTask = (zone, mouseY) => {
	const els = zone.querySelectorAll('.task:not(.is-dragging)');

	let closestTask = null;
	let closestOffset = Number.NEGATIVE_INFINITY;

	els.forEach((task) => {
		const { top } = task.getBoundingClientRect();
		const offset = mouseY - top;

		if (offset < 0 && offset > closestOffset) {
			closestOffset = offset;
			closestTask = task;
		}
	});

	return closestTask;
};

// Aktualizacja liczników zadań w kolumnach
function updateCounters() {
	columns.forEach((column) => {
		const tasks = column.querySelectorAll('.task');
		const taskCountElement = column.querySelector('.task-count');
		taskCountElement.textContent = tasks.length;
	});
}

// Obsługa usuwania wszystkich zadań z kolumn
function clearAllTasksFromColumn(column) {
	const tasks = column.querySelectorAll('.task');
	tasks.forEach((task) => {
		task.remove();
	});
	clearAllTasksFromState();
	updateCounters();
}

// Nasłuchiwanie na kliknięcie przycisku usuwania wszystkich zadań
clearAllTasks.addEventListener('click', () => {
	columns.forEach((column) => {
		clearAllTasksFromColumn(column);
	});
});
