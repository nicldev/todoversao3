// Configuração do Parse
Parse.initialize("YCwqaASQwQfiZrsGP9sPByTdB4HNwkCU8527wZfd", "yXpmGMbFe1lFFTyoXFkG9fLmWtARAgeGzRApKuIw");
Parse.serverURL = "https://parseapi.back4app.com/";

const Task = Parse.Object.extend("Task");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Create
async function createTask(title, description) {
    const task = new Task();
    task.set("title", title);
    task.set("description", description);
    task.set("completed", false);
    return await task.save();
}

// Read
async function loadTasks() {
    const query = new Parse.Query(Task);
    const results = await query.find();
    return results;
}

// Update
async function updateTask(id, updates) {
    const task = await getTaskById(id);
    Object.keys(updates).forEach(key => task.set(key, updates[key]));
    return await task.save();
}

// Delete
async function deleteTask(id) {
    const task = await getTaskById(id);
    return await task.destroy();
}

// Form Submit
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    
    await createTask(title, description);
    taskForm.reset();
    renderTasks();
});

// Render Tasks
async function renderTasks() {
    const tasks = await loadTasks();
    taskList.innerHTML = tasks.map(task => `
        <div class="task" data-id="${task.id}">
            <h3>${task.get("title")}</h3>
            <p>${task.get("description")}</p>
            <button onclick="toggleComplete('${task.id}')">
                ${task.get("completed") ? 'Desfazer' : 'Completar'}
            </button>
            <button onclick="deleteTask('${task.id}')">Excluir</button>
        </div>
    `).join("");
}

// Inicialização
renderTasks();