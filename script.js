const todoInput = document.querySelector('.todo-input');
const todoAddBtn = document.querySelector('.todo-add-btn');
const todoList = document.querySelector('.todo-list');

// Load saved tasks from localStorage when the page loads
window.addEventListener('load', loadTasks);

// Add task event
todoAddBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create the task element
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.addEventListener('change', () => {
        todoItem.classList.toggle('completed');
        saveTasks(); // Save tasks whenever checkbox is changed
    });

    // Create the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Create the delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-task');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => {
        todoItem.remove();
        saveTasks(); // Save tasks after deletion
    });

    // Append elements to the task item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(taskSpan);
    todoItem.appendChild(deleteBtn);

    // Add the task to the list
    todoList.appendChild(todoItem);

    // Clear the input field
    todoInput.value = '';

    // Save tasks to localStorage
    saveTasks();
}

// Save the current tasks to localStorage
function saveTasks() {
    const tasks = [];
    const todoItems = document.querySelectorAll('.todo-item');

    todoItems.forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const isCompleted = item.classList.contains('completed');
        tasks.push({ taskText, isCompleted });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedTasks) {
        savedTasks.forEach(task => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            if (task.isCompleted) {
                todoItem.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.checked = task.isCompleted;
            checkbox.addEventListener('change', () => {
                todoItem.classList.toggle('completed');
                saveTasks();
            });

            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.taskText;

            const deleteBtn = document.createElement('span');
            deleteBtn.classList.add('delete-task');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', () => {
                todoItem.remove();
                saveTasks();
            });

            todoItem.appendChild(checkbox);
            todoItem.appendChild(taskSpan);
            todoItem.appendChild(deleteBtn);

            todoList.appendChild(todoItem);
        });
    }
}
