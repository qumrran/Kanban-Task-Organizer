// Obiekt stanu
let state = {
	toDoState: [],
	inProgressState: [],
	doneState: [],
};

//Pushowanie do stanu

function addTaskToState(taskId, taskText) {
	state.toDoState.push({ id: taskId, text: taskText });

	console.log(state);
}

// Funkcja usuwająca zadanie na podstawie identyfikatora
function deleteTaskfromStateById(taskId) {
	for (let key in state) {
		state[key] = state[key].filter((task) => task.id !== taskId);
	}
	console.log(state);
}

// Funkcją usuwająca wszystkie zdania
function clearAllTasksFromState() {
	state.toDoState = [];
	state.inProgressState = [];
	state.doneState = [];
	console.log(state);
}

// Funkcja aktualizująca stan podczas przeciagania zadań miedzy kolumnami
function updateTaskStateInColumn(zone, taskId, taskText) {
	if (zone.id === 'todo-column') {
		updateState(taskId, taskText, state.toDoState);
	} else if (zone.id === 'in-progress-column') {
		updateState(taskId, taskText, state.inProgressState);
	} else if (zone.id === 'done-column') {
		updateState(taskId, taskText, state.doneState);
	}

	function updateState(taskId, taskText, targetState) {
		targetState.push({ id: taskId, text: taskText });

		for (let key in state) {
			if (state[key] !== targetState) {
				state[key] = state[key].filter((task) => task.id !== taskId);
			}
		}

		console.log(state);
	}
}

export {
	addTaskToState,
	deleteTaskfromStateById,
	clearAllTasksFromState,
	updateTaskStateInColumn,
};
