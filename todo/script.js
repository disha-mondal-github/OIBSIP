const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const addTaskBtn = document.getElementById('add-task');
const pendingTasksTable = document.getElementById('pending-tasks').getElementsByTagName('tbody')[0];
const completedTasksTable = document.getElementById('completed-tasks').getElementsByTagName('tbody')[0];

let tasks = [];

function addTask() {
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();

    if (title && description) {
        const task = {
            id: Date.now(),
            title,
            description,
            dateAdded: new Date().toLocaleString(),
            completed: false
        };

        tasks.push(task);
        renderPendingTasks();
        taskTitle.value = '';
        taskDescription.value = '';
    }
}

function renderPendingTasks() {
    pendingTasksTable.innerHTML = '';
    tasks.filter(task => !task.completed).forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.dateAdded}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="action-btn edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="action-btn complete-btn" onclick="completeTask(${task.id})">Complete</button>
            </td>
        `;
        pendingTasksTable.appendChild(row);
    });
}

function renderCompletedTasks() {
    completedTasksTable.innerHTML = '';
    tasks.filter(task => task.completed).forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.dateAdded}</td>
            <td>${task.dateCompleted}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="action-btn edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="action-btn pending-btn" onclick="markAsPending(${task.id})">Mark as Pending</button>
            </td>
        `;
        completedTasksTable.appendChild(row);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderPendingTasks();
    renderCompletedTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    deleteTask(id);
}

function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = true;
    task.dateCompleted = new Date().toLocaleString();
    renderPendingTasks();
    renderCompletedTasks();
}

function markAsPending(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = false;
    delete task.dateCompleted;
    renderPendingTasks();
    renderCompletedTasks();
}

addTaskBtn.addEventListener('click', addTask);
renderPendingTasks();
renderCompletedTasks();